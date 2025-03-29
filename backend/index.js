const Student = require("./models/student.models");
require("dotenv").config();
const { initializeDB } = require("./db/db.connect");
initializeDB();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/students", async (req, res) => {
  try {
    const getAllStudents = await Student.find();
    res.status(200).json(getAllStudents);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const { name, age, grade, gender, attendance, marks } = req.body;
    const student = new Student({
      name,
      age,
      grade,
      gender,
      attendance,
      marks
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.put("/students/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  const updatedData = req.body;

  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      updatedData,
      { new: true }
    );
    if (updatedStudent) {
      res
        .status(200)
        .json({
          message: "student updated successfully",
          student: updatedStudent,
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.delete("/students/:studentId", async (req, res) => {
  const studentId = req.params.studentId;
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    res
      .status(200)
      .json({
        message: "Deleted Student Successfully",
        student: deletedStudent,
      });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
