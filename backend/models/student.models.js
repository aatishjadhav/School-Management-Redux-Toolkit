const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number },
  grade: { type: String },
  gender: { type: String },
  attendance: { type: Number },
  marks: { type: Number },
});

const student = mongoose.model("students", StudentSchema);

module.exports = student;
