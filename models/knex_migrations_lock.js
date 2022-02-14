const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return knex_migrations_lock.init(sequelize, DataTypes);
}

class knex_migrations_lock extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    index: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    is_locked: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'knex_migrations_lock',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "index" },
        ]
      },
    ]
  });
  }
}
