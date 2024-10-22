const { CV } = require("./CV");
module.exports = (sequelize, Sequelize) => {
  const Education = sequelize.define("Education", {
    cvId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CV,
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
  });
  Education.associate = (models) => {
    Education.belongsTo(models.CV, {
      foreignKey: "cvId",
      as: "education",
    });
  };
  return Education;
};
