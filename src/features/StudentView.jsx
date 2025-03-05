import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "./studentsSlice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const StudentView = () => {
  const dispatch = useDispatch();
  const { students, status, error } = useSelector((state) => state.students);
  console.log("Student view", students);

  useEffect(() => {
    dispatch(fetchStudents());
  }, []);

  return (
    <div className="py-3">
      <h1>Student View</h1>
      <Link to="/add-students" className="btn btn-warning">Add Students</Link>
      <h1>Student List</h1>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/students/${student._id}`}>
              {student.name} (Age: {student.age})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentView;
