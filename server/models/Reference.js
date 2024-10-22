// Reference.js
const { CV } = require("./CV");
module.exports = (sequelize, Sequelize) => {
  const Reference = sequelize.define("Reference", {
    cvId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: CV,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    employerName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    company: {
      type: Sequelize.STRING,
    },
  });
  Reference.associate = (models) => {
    Reference.belongsTo(models.CV, {
      foreignKey: "cvId",
      as: "reference",
    });
  };
  return Reference;
};
