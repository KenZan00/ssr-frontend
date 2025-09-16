import { Routes, Route } from "react-router-dom";
import TestView from "./views/TestView.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TestView />} />
    </Routes>
  );
}
