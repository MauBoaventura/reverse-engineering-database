const DataTypes = require("sequelize").DataTypes;
const _clientes = require("./clientes");
const _knex_migrations = require("./knex_migrations");
const _knex_migrations_lock = require("./knex_migrations_lock");
const _pedidos = require("./pedidos");
const _tabela_de_precos = require("./tabela_de_precos");
const _tabela_de_precos_compra = require("./tabela_de_precos_compra");
const _users = require("./users");

function initModels(sequelize) {
  const clientes = _clientes(sequelize, DataTypes);
  const knex_migrations = _knex_migrations(sequelize, DataTypes);
  const knex_migrations_lock = _knex_migrations_lock(sequelize, DataTypes);
  const pedidos = _pedidos(sequelize, DataTypes);
  const tabela_de_precos = _tabela_de_precos(sequelize, DataTypes);
  const tabela_de_precos_compra = _tabela_de_precos_compra(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  pedidos.belongsTo(clientes, { as: "cliente", foreignKey: "clienteId"});
  clientes.hasMany(pedidos, { as: "pedidos", foreignKey: "clienteId"});
  pedidos.belongsTo(tabela_de_precos, { as: "tabela", foreignKey: "tabelaId"});
  tabela_de_precos.hasMany(pedidos, { as: "pedidos", foreignKey: "tabelaId"});
  pedidos.belongsTo(tabela_de_precos_compra, { as: "tabelaCompra", foreignKey: "tabelaCompraId"});
  tabela_de_precos_compra.hasMany(pedidos, { as: "pedidos", foreignKey: "tabelaCompraId"});

  return {
    clientes,
    knex_migrations,
    knex_migrations_lock,
    pedidos,
    tabela_de_precos,
    tabela_de_precos_compra,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
