module.exports = (sequelize, DataTypes) => {
  const Subject = sequelize.define("subjects", {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Subject;
};
