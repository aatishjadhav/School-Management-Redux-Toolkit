import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents, setFilter, setSortBy } from "./studentsSlice";

const ClassView = () => {
  const dispatch = useDispatch();
  const { students, sortBy, filter, status, error } = useSelector((state) => state.students);
 

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  const filteredStudents =
    filter === "All"
      ? students
      : students.filter(
          (stu) => stu.gender === (filter === "Boys" ? "Male" : "Female")
        );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (sortBy === "Name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "Marks") {
      return b.marks - a.marks;
    } else if (sortBy === "Attendance") {
      return b.attendance - a.attendance;
    }
    return 0;
  });


  return (
    <div>
      <h1>Class View</h1>
      <label htmlFor="">Filter by Gender:</label>
      <select name="" id="" value={filter} onChange={handleFilterChange}>
        <option value="All">All</option>
        <option value="Boys">Boys</option>
        <option value="Girls">Girls</option>
      </select>{" "}
      <br />
      <br />
      <label htmlFor="">Sort by:</label>
      <select name="" id="" value={sortBy} onChange={handleSortChange}>
        <option value="Name">Name</option>
        <option value="Marks">Marks</option>
        <option value="Attendance">Attendance</option>
      </select>
      <br />
      <br />
      <ul>
        {sortedStudents.map((stu) => (
          <li key={stu._id}>
            {stu.name} - {stu.gender} - Marks: {stu.marks} - Attendance:{" "}
            {stu.attendance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassView;
