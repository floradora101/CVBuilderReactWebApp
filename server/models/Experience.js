const { CV } = require("./CV");
module.exports = (sequelize, Sequelize) => {
  const Experience = sequelize.define("Experience", {
    cvId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CV,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    jobTitle: {
      type: Sequelize.STRING,
    },
    employer: {
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
  });
  Experience.associate = (models) => {
    Experience.belongsTo(models.CV, {
      foreignKey: "cvId",
      as: "experience",
    });
  };
  return Experience;
};
