import { Routes, Route, Link } from "react-router-dom";
import StudentView from "./features/StudentView";
import StudentForm from "./features/StudentForm";
import { useSelector } from "react-redux";
import StudentDetail from "./features/StudentDetail";
import ClassView from "./features/ClassView";
import SchoolView from "./features/SchoolView";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="container py-3">
      <Navbar/>
      <Routes>
        <Route path="/" element={<StudentView />} />
        <Route path="/add-students" element={<StudentForm />} />
        <Route path="/students/:id" element={<StudentDetail />} />
        <Route path="/edit/:id" element={<StudentForm />} />
        <Route path="/view" element={<ClassView />} />
        <Route path="/stats" element={<SchoolView />} />
      </Routes>
    </main>
  );
}

export default App;
