import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/students";

// Fetch all students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

// Add a new student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (student) => {
    const response = await axios.post(BASE_URL, student);
    return response.data;
  }
);

// Update an existing student
export const updateStudent = createAsyncThunk(
  "students/updateStudent",
  async (student) => {
    const response = await axios.put(`${BASE_URL}/${student._id}`, student);
    return response.data.student;
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudent",
  async (studentId) => {
    const response = await axios.delete(`${BASE_URL}/${studentId}`);
    return response.data.studentId;
  }
);

export const studentsSlice = createSlice({
  name: "students",
  initialState: {
    students: [],
    status: "idle",
    error: null,
    filter: "All",
    sortBy: "name",
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudents.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchStudents.fulfilled, (state, action) => {
      state.status = "success";
      state.students = action.payload;
    });
    builder.addCase(fetchStudents.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(addStudent.fulfilled, (state, action) => {
      state.students.push(action.payload);
    });
    // builder.addCase(updateStudent.fulfilled, (state, action) => {
    //   const index = state.students.findIndex(
    //     (stu) => stu._id === action.payload._id
    //   );
    //   if (index !== -1) {
    //     state.students[index] = action.payload;
    //   }
    // });
    builder.addCase(updateStudent.fulfilled, (state, action) => {
  state.students = state.students.map((stu) =>
    stu._id === action.payload._id ? action.payload : stu
  );
});

    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      state.students = state.students.filter(
        (stu) => stu._id !== action.payload
      );
    });
  },
});

export const { setFilter, setSortBy } = studentsSlice.actions;
export default studentsSlice.reducer;
