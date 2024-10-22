"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("PersonalDetails", {
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
      wantedJobTitle: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      postalCode: {
        type: Sequelize.STRING,
      },

      drivingLicense: {
        type: Sequelize.STRING,
      },

      nationality: {
        type: Sequelize.STRING,
      },

      dateOfBirth: {
        type: Sequelize.STRING,
      },

      placeOfBirth: {
        type: Sequelize.STRING,
      },

      professionalSummary: {
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
    await queryInterface.addIndex("PersonalDetails", ["cvId"]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("PersonalDetails");
  },
};
