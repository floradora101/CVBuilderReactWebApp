const { CV } = require("./CV");
module.exports = (sequelize, Sequelize) => {
  const PersonalDetails = sequelize.define("PersonalDetails", {
    cvId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CV,
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
  });
  PersonalDetails.associate = (models) => {
    PersonalDetails.belongsTo(models.CV, {
      foreignKey: "cvId",
      as: "details",
    });
  };
  return PersonalDetails;
};
