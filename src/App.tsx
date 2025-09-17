import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./Router";
import Layout from "./layout/layout"

function App() {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
}

export default App
