"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        validate: {
          isEmail: true,
        },
        // unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subscriptionStatus: {
        type: Sequelize.ENUM("active", "inactive", "pending"),
        defaultValue: "inactive",
        allowNull: false,
      },
      maxCvsAllowed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Users");
  },
};
