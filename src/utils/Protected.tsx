import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import auth from "../models/auth.ts";

const Protected = () => {
    const [validToken, setValidToken] = useState<boolean | null>(null);

    useEffect(() => {
        const authTokenState = async () => {
            try {
                const getTokenAuth = await auth.token();
                setValidToken(getTokenAuth);
            } catch (error) {
                console.error("Failed to auth token", error);
            }
        };

        authTokenState();
    }, []);
    if (validToken === null) {
        return <div></div>;
    }
    return validToken ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>
}

export default Protected
