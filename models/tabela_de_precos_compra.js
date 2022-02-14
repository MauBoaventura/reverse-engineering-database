const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return tabela_de_precos_compra.init(sequelize, DataTypes);
}

class tabela_de_precos_compra extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valorCompra: {
      type: DataTypes.FLOAT(8,2),
      allowNull: false,
      defaultValue: 0.00
    },
    dataInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    dataFim: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    situacao: {
      type: DataTypes.ENUM('PAGO','ABRT','VENC'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tabela_de_precos_compra',
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
    ]
  });
  }
}
