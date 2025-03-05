import { createSlice } from "@reduxjs/toolkit";

export const schoolSlice = createSlice({
  name: "school",
  initialState: {
    totalStudents: 0,
    averageMarks: 0,
    averageAttendance: 0,
    topStudent: null,
  },
  reducers: {
    updateStudentStats: (state, action) => {
      state.totalStudents = action.payload.totalStudents;
      state.averageMarks = action.payload.averageMarks;
      state.averageAttendance = action.payload.averageAttendance;
    },
    setTopStudent: (state, action) => {
      state.topStudent = action.payload;
    },
  },
});

export const { updateStudentStats, setTopStudent } = schoolSlice.actions;

export default schoolSlice.reducer;
