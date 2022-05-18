"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class barangkeluar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      barangkeluar.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
    }
  }
  barangkeluar.init(
    {
      iduser: DataTypes.INTEGER,
      kodebarang: DataTypes.STRING,
      tgl: DataTypes.STRING,
      jumlah: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "barangkeluar",
    }
  );
  return barangkeluar;
};
