import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import App from "./App.jsx";
import StudentView from "./features/StudentView.jsx";
import StudentForm from "./features/StudentForm.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
</StrictMode>
);
