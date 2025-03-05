import { configureStore } from "@reduxjs/toolkit";
import { studentsSlice } from "../features/studentsSlice";
import { schoolSlice } from "../features/schoolSlice";

export default configureStore({
  reducer: {
    students: studentsSlice.reducer,
    school: schoolSlice.reducer
  }
});