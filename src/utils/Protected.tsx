import { Outlet, Navigate } from "react-router-dom";
import auth from "../models/auth.ts";
const validToken = await auth.token();

const Protected = () => {
    return validToken ? <Outlet></Outlet> : <Navigate to='/login'></Navigate>
}

export default Protected
