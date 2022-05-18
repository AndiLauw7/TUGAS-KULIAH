"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class persediaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      persediaan.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "iduser",
        },
      });
      persediaan.belongsTo(models.barangmasuk, {
        as: "barangmasuk",
        foreignKey: {
          name: "idmasuk",
        },
      });
      persediaan.belongsTo(models.barangkeluar, {
        as: "barangkeluar",
        foreignKey: {
          name: "idkeluar",
        },
      });
    }
  }
  persediaan.init(
    {
      iduser: DataTypes.INTEGER,
      kodebarang: DataTypes.STRING,
      idmasuk: DataTypes.INTEGER,
      stokawal: DataTypes.STRING,
      idkeluar: DataTypes.INTEGER,
      stokakhir: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "persediaan",
    }
  );
  return persediaan;
};
