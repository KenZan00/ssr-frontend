import { Routes, Route } from "react-router-dom";
// import TestView from "./views/TestView.tsx";
import AppFormView from "./views/AppFormView.tsx";
import DocumentsListView from "./views/DocumentsListView.tsx";
import CodeModeView from "./views/CodeModeView.tsx";
import HeroView from "./views/HeroView.tsx";
import Layout from "./layout/layout.tsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/hero" element={<HeroView />} />

      <Route element={<Layout />}>
        <Route path="/" element={<DocumentsListView />} />
        <Route path="/:id" element={<AppFormView />} />
        <Route path="/code" element={<CodeModeView />} />
        <Route path="/hero" element={<HeroView />} />
      </Route>
    </Routes>
  );
}
