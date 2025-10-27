import { Routes, Route } from "react-router-dom";
import Protected from "./utils/Protected.tsx";
// import TestView from "./views/TestView.tsx";
import AppFormView from "./views/AppFormView.tsx";
import DocumentsListView from "./views/DocumentsListView.tsx";
import LoginFormView from "./views/LoginFormView.tsx";
import SignupFormView from "./views/SignupFormView.tsx";
import LogoutView from "./views/LogoutView.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<Protected />}>
        <Route path="/" element={<DocumentsListView />} />
        <Route path="/newdoc" element={<AppFormView />} />
        <Route path="/:id" element={<AppFormView />} />
      </Route>
      <Route path="/login" element={<LoginFormView />} />
      <Route path="/signup" element={<SignupFormView />} />
      <Route path="/logout" element={<LogoutView />} />
    </Routes>
  );
}
