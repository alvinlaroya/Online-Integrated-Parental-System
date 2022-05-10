require("dotenv").config();
const jwt = require("jsonwebtoken");
const controller = require("../controllers/subject.controller.js");

const router = require("express").Router();

// routes
router.post("/addSubject", middleware, controller.addSubject);
router.get("/getSubjects", middleware, controller.getAllSubject);
router.put("/updateSubject/:id", middleware, controller.updateSubject);

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
