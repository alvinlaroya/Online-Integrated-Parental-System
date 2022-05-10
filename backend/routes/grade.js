require("dotenv").config();
const jwt = require("jsonwebtoken");
const controller = require("../controllers/grade.controller.js");

const router = require("express").Router();

// routes
router.post("/addGrade", middleware, controller.addGrade);
router.get("/getGrade", middleware, controller.getGrade);
router.post("/getGradeByStudent", middleware, controller.getGradeByStudent);
router.put("/updateGrade/:id", middleware, controller.updateGrade);

function middleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_JWT_KEY, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = router;
