import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";


export default function LoginFormView() {

    return <div className="login-form">
                <h3><Link to={`/signup`}>Klicka här för att registrera dig</Link></h3>
                <h2>Login</h2>
                <LoginForm />
            </div>
}
