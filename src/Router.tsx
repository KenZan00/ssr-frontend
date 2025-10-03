import { Routes, Route } from "react-router-dom";
// import TestView from "./views/TestView.tsx";
import AppFormView from "./views/AppFormView.tsx";
import DocumentsListView from "./views/DocumentsListView.tsx";
import LoginFormView from "./views/LoginFormView.tsx";
import SignupFormView from "./views/SignupFormView.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<DocumentsListView />} />
      <Route path="/:id" element={<AppFormView />} />
      <Route path="/login" element={<LoginFormView />} />
      <Route path="/signup" element={<SignupFormView />} />
    </Routes>
  );
}
