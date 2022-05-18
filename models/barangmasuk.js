"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barangmasuk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barangmasuk.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  barangmasuk.init(
    {
      iduser: DataTypes.INTEGER,
      kodebarang: DataTypes.STRING,
      tgl: DataTypes.STRING,
      jumlah: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barangmasuk",
    }
  );
  return barangmasuk;
};
