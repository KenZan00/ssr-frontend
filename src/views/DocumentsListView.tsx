import DocumentsList from "../components/DocumentsList"
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";
import auth from "../models/auth.ts";
const validToken = await auth.token();



export default function DocumentsListView() {
    if (!validToken) {
        return <div className="login-form">
            <h3><Link to={`/signup`}>Klicka här för att registrera dig</Link></h3>
            <h2>Login</h2>
            <LoginForm />
        </div>
    }

    return (
        <>
            <h2>Dokument</h2>
            <DocumentsList />
        </>
    );
}
