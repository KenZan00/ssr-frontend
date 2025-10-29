import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";


export default function LoginFormView() {

    return <div className="login-form">
                <h2>Login</h2>
                <LoginForm />
                <br />
                <p>Inte registrerad ännu?</p>
                <h3>
                    <Link to={`/signup`} className="sign-up">Klicka här för att registrera dig</Link>
                </h3>
            </div>
}
