"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("References", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cvId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "CVs", // Change to the actual table name for the CV model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      employerName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      company: {
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

    // Add an index for the foreign key
    await queryInterface.addIndex("References", ["cvId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("References");
  },
};
