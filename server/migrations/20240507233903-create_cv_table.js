"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CVs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Change to the actual table name for the User model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      color: {
        type: Sequelize.STRING,
      },
      templateId: {
        type: Sequelize.INTEGER,
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.JSON),
      },
      languages: {
        type: Sequelize.ARRAY(Sequelize.JSON),
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
    await queryInterface.addIndex("CVs", ["userId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CVs");
  },
};
