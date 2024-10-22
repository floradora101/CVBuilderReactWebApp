"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Educations", {
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
      school: {
        type: Sequelize.STRING,
      },
      degree: {
        type: Sequelize.STRING,
      },
      startDate: {
        type: Sequelize.DATE,
      },
      endDate: {
        type: Sequelize.DATE,
      },
      city: {
        type: Sequelize.STRING,
      },
      description: {
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
    await queryInterface.addIndex("Educations", ["cvId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Educations");
  },
};
