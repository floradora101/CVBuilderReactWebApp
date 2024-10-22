// CustomSection.js
const { CV } = require("./CV");
module.exports = (sequelize, Sequelize) => {
  const Section = sequelize.define("Section", {
    cvId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CV,
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
  });
  Section.associate = (models) => {
    Section.belongsTo(models.CV, {
      foreignKey: "cvId",
      as: "section",
    });
  };
  return Section;
};
