"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("persediaans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iduser: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      kodebarang: {
        type: Sequelize.STRING,
      },
      idmasuk: {
        type: Sequelize.INTEGER,
        references: {
          model: "barangmasuks",
          key: "id",
        },
      },
      stokawal: {
        type: Sequelize.STRING,
      },
      idkeluar: {
        type: Sequelize.INTEGER,
        references: {
          model: "barangkeluars",
          key: "id",
        },
      },
      stokakhir: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("persediaans");
  },
};
