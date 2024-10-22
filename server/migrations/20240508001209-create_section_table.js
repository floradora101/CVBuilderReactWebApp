"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Sections", {
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
          model: "CVs",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sectionName: {
        type: Sequelize.STRING,
      },
      sectionData: {
        type: Sequelize.TEXT,
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
    await queryInterface.addIndex("Sections", ["cvId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Sections");
  },
};
