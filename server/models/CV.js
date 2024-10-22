const { User } = require("./User");
module.exports = (sequelize, Sequelize) => {
  const CV = sequelize.define("CV", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
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
  });
  CV.associate = (models) => {
    CV.hasMany(models.Experience, {
      foreignKey: "cvId",
      onDelete: "CASCADE",
    });
    CV.hasMany(models.Section, {
      foreignKey: "cvId",
      onDelete: "CASCADE",
    });
    CV.hasMany(models.Reference, {
      foreignKey: "cvId",
      onDelete: "CASCADE",
    });
    CV.hasMany(models.Education, {
      foreignKey: "cvId",
      onDelete: "CASCADE",
    });
    CV.hasOne(models.PersonalDetails, {
      foreignKey: "cvId",
      onDelete: "CASCADE",
    });
    CV.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return CV;
};
