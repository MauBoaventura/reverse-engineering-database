const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return pedidos.init(sequelize, DataTypes);
}

class pedidos extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    clienteId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'clientes',
        key: 'id'
      }
    },
    dataPedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    dataVencimentoPedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: "0000-00-00 00:00:00"
    },
    quant_caixa: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quilo: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    tabelaId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tabela_de_precos',
        key: 'id'
      }
    },
    quilo_desconto: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    desconto: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    frete: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    pagoFornecedor: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    totalArrecadado: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    totalDaNota: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    situacao: {
      type: DataTypes.ENUM('PAGO','ABRT','VENC'),
      allowNull: true,
      defaultValue: "ABRT"
    },
    tabelaCompraId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'tabela_de_precos_compra',
        key: 'id'
      }
    },
    valorLucro: {
      type: DataTypes.FLOAT(8,2),
      allowNull: true,
      defaultValue: 0.00
    },
    quant_frango: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'pedidos',
    timestamps: false,
    // paranoid: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "pedidos_clienteid_foreign",
        using: "BTREE",
        fields: [
          { name: "clienteId" },
        ]
      },
      {
        name: "pedidos_tabelaid_foreign",
        using: "BTREE",
        fields: [
          { name: "tabelaId" },
        ]
      },
      {
        name: "pedidos_tabelacompraid_foreign",
        using: "BTREE",
        fields: [
          { name: "tabelaCompraId" },
        ]
      },
    ]
  });
  }
}
