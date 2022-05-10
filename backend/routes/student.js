require("dotenv").config();
const jwt = require("jsonwebtoken");
const controller = require("../controllers/student.controller.js");

const router = require("express").Router();

// routes
router.post("/addStudent", middleware, controller.addStudent);
router.get("/getStudents", middleware, controller.getAllStudents);
router.get(
  "/getStudentsWithParent/:id",
  middleware,
  controller.getAllStudentsWithParent
);
router.put("/updateStudent/:id", middleware, controller.updateStudent);

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
