const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

// MODEL
const Student = db.students;

// CREATE STUDENT
const addStudent = async (req, res) => {
  const result = await Student.create(req.body);
  res.status(200).send(result);
};

// READ STUDENTS

const getAllStudents = async (req, res) => {
  let result = await Student.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: result,
  });
};

// READ STUDENTS WITH PARENT

const getAllStudentsWithParent = async (req, res) => {
  let result = await Student.findAndCountAll({
    order: [["createdAt", "DESC"]],
    where: {
      parentId: req.params.id,
    },
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: result,
  });
};

/* // DELETE CASE
const deleteCase = async (req, res) => {
    await Case.destroy({
        where: {
            id: req.params.id
        }
    });

    res.send("Delete succesfully")
}
 */

// UPDATE STUDENT
const updateStudent = async (req, res) => {
  const student = req.body;

  await Student.update(student, {
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
};

module.exports = {
  addStudent,
  getAllStudents,
  getAllStudentsWithParent,
  updateStudent,
};
