import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
    return (
        <header className="ssr-header">
            <div className="header-container">
                <h1>Code</h1>
                <img src={logo} alt="Logo" className="logo" />
                <h1>Write</h1>
                <Link to="/logout" className="logout blue-button">Logga ut</Link>
            </div>

        </header>
    )
}
