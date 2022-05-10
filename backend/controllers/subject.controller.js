const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const db = require("../models");

// MODEL
const Subject = db.subjects;

// CREATE SUBJECT
const addSubject = async (req, res) => {
  const result = await Subject.create(req.body);
  res.status(200).send(result);
};

// READ SUBJECT

const getAllSubject = async (req, res) => {
  let subjects = await Subject.findAndCountAll({
    order: [["createdAt", "DESC"]],
  });

  res.header("Access-Control-Allow-Origin", "*");
  res.json({
    message: "success",
    data: subjects,
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

// UPDATE CASE
const updateSubject = async (req, res) => {
  const subject = req.body;

  await Subject.update(subject, {
    where: {
      id: req.params.id,
    },
  });

  res.sendStatus(200);
};

module.exports = {
  addSubject,
  getAllSubject,
  updateSubject,
};
