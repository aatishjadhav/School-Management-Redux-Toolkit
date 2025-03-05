import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setTopStudent, updateStudentStats } from "./schoolSlice";
import { fetchStudents } from "./studentsSlice";

const SchoolView = () => {
  const dispatch = useDispatch();
  const { totalStudents, averageAttendance, averageMarks, topStudent } =
        useSelector((state) => state.school);
    
    const { students, status, error } = useSelector((state) => state.students);
    console.log("Student view", students);

    useEffect(() => {
        dispatch(fetchStudents());
    }, []);

  useEffect(() => {
    if (students.length === 0) return;

    const totalStudents = students.length;

    const averageAttendance =
      students.reduce((sum, student) => sum + student.attendance, 0) /
      totalStudents;

    const averageMarks =
      students.reduce((sum, student) => sum + student.marks, 0) / totalStudents;

    const topStudent = students.reduce((prev, curr) =>
      curr.marks > prev.marks ? curr : prev
    );

    dispatch(
      updateStudentStats({
        totalStudents,
        averageAttendance,
        averageMarks,
        topStudent,
      })
    );

    dispatch(setTopStudent(topStudent));
  }, [students, dispatch]);  // ✅ Fix: Runs only when students change

  console.log("Students from Redux:", students);

  return (
    <div>
      <h1>School Statistics</h1>
      <p>Total Students: {totalStudents}</p>
      <p>Average Attendance: {averageAttendance.toFixed(2)}%</p>
      <p>Average Marks: {averageMarks.toFixed(2)}</p>
      <p>
        Top Student: {topStudent ? `${topStudent.name} (${topStudent.marks})` : "N/A"}
      </p>
    </div>
  );
};

export default SchoolView;
