import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../models/auth.ts";

export default function LogoutView() {
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await auth.logout();
            navigate("/login");
        })();
    }, [navigate]);

    return <h3>
        Logging out please wait...
    </h3>
}
