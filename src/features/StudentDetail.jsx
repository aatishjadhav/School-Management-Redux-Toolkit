import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteStudent } from "./studentsSlice";

const StudentDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { students, status, error } = useSelector((state) => state.students);
  console.log("Student view", students);

    const student = students.find((stu) => stu._id === id);
    console.log(student);
    
  if (!student) {
    return <h2>Student Not Found</h2>;
  }

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
    console.log("Student deleted successfully", student);
  };

  return (
    <div>
      <h1>Student Details</h1>
      <p>
        <strong>Name:</strong> {student.name}
      </p>
      <p>
        <strong>Age:</strong> {student.age}
      </p>
      <p>
        <strong>Grade:</strong> {student.grade}
          </p>
          <p>
        <strong>Gender:</strong> {student.gender}
      </p>
      <p>
        <strong>Attendance:</strong> {student.attendance}
      </p>
      <p>
        <strong>Marks:</strong> {student.marks}
      </p>

      <Link className="btn btn-warning" to={`/edit/${student._id}`}>
        Edit Details
      </Link>
      <Link
        to="/"
        onClick={() => handleDelete(student._id)}
        className="btn btn-danger"
      >
        Delete
      </Link>
    </div>
  );
};

export default StudentDetail;
