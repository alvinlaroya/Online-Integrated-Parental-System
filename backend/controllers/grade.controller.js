const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

// MODEL
const Grade = db.grades;

// CREATE GRADE
const addGrade = async (req, res) => {
  const result = await Grade.bulkCreate(req.body);
  res.status(200).send(result);
};

// READ GRADE

const getGrade = async (req, res) => {
  let result = await Grade.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: result,
  });
};

// READ GRADE BY STUDENT

const getGradeByStudent = async (req, res) => {
  const { studentId, sy, semester } = req.body;

  let result = await Grade.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      studentId: studentId,
      semester: semester,
      sy: `${sy.from}-${sy.to}`,
    },
    raw: true,
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: result,
  });
};

/* 
// DELETE CASE
const deleteCase = async (req, res) => {
    await Case.destroy({
        where: {
            id: req.params.id
        }
    });

    res.send("Delete succesfully")
}

 */

// UPDATE GRADE
const updateGrade = async (req, res) => {
  const grade = req.body;

  await Grade.update(grade, {
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
};

module.exports = {
  addGrade,
  getGrade,
  getGradeByStudent,
  updateGrade,
};
