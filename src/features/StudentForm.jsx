import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "./studentsSlice"; 
import { useParams, useNavigate } from "react-router-dom";

const StudentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const students = useSelector((state) => state.students.students);
  const existingStudent = students.find((stu) => stu._id === id);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [gender, setGender] = useState("");
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");

  // Populate the form if in edit mode
  useEffect(() => {
    if (existingStudent) {
      setName(existingStudent.name);
      setAge(existingStudent.age);
      setGrade(existingStudent.grade);
      setGender(existingStudent.gender);
      setAttendance(existingStudent.attendance);
      setMarks(existingStudent.marks);
    }
  }, [existingStudent]);

  const formHandler = (e) => {
    e.preventDefault();
    const studentData = { _id: id, name, age, grade, gender, attendance, marks };
  
    if (id) {
      dispatch(updateStudent(studentData))
        .then(() => console.log("Student updated successfully", studentData))
        .catch((error) => console.error("Update error:", error));
    } else {
      dispatch(addStudent(studentData))
        .then(() => console.log("Student added successfully", studentData))
        .catch((error) => console.error("Add error:", error));
    }
  
    navigate("/"); 
  };
  

  return (
    <div>
      <h1>{id ? "Edit Student" : "Add Student"}</h1>
      <form onSubmit={formHandler}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <br /><br />
        <input type="text" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
        <br /><br />
        <input type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} />
        <br /><br />
        <input type="text" placeholder="Attendance" value={attendance} onChange={(e) => setAttendance(e.target.value)} />
        <br /><br />
        <input type="text" placeholder="Marks" value={marks} onChange={(e) => setMarks(e.target.value)} />
        <br /><br />
        <label>Gender:</label>
        <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)} /> Male
        <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} /> Female
        <br /><br />
        <button className="btn btn-primary" type="submit">{id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default StudentForm;
