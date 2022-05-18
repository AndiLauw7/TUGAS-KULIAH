"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("barangkeluars", {
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
      tgl: {
        type: Sequelize.STRING,
      },
      jumlah: {
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
    await queryInterface.dropTable("barangkeluars");
  },
};
