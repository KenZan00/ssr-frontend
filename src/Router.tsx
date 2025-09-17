import { Routes, Route } from "react-router-dom";
import TestView from "./views/TestView.tsx";
import AppForm from "./components/form.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TestView />} />
      <Route path="/form" element={<AppForm />} />
    </Routes>
  );
}
