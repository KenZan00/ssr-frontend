import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import Layout from "./layout/layout"

function App() {
  return (
    <BrowserRouter basename="/ssr-frontend">
        <AppRouter />
    </BrowserRouter>
  );
}

export default App
