module.exports = (sequelize, DataTypes) => {
  const Grade = sequelize.define("grades", {
    studentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subjectCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subjectUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    grade: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    semester: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Grade;
};
