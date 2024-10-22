module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
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
      validate: {
        isEmail: true,
      },
      allowNull: false,
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
  });
  User.associate = (models) => {
    User.hasMany(models.CV, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });
  };
  return User;
};
