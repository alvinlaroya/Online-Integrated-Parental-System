const express = require("express");
const cors = require("cors");

const app = express();
// middleware

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// routers
const userRoutes = require("./routes/user.js");
const studentRoutes = require("./routes/student.js");
const subjectRoutes = require("./routes/subject.js");
const gradeRoutes = require("./routes/grade.js");

app.use("/api/user", userRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/subject", subjectRoutes);
app.use("/api/grade", gradeRoutes);

// static images folder
app.use("/images", express.static("./images"));

// api

app.get("/", (req, res) => {
  res.json({ message: "hello from api" });
});

const PORT = process.env.PORT || 8000;

// server

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
