import { baseURL } from "../utils/utils.ts";

const auth = {
    login: async function login(data: 
        { email: string; password: string; }) {
        const response = await fetch(`${baseURL}/auth/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.data) {
            localStorage.setItem("token", result.data.token);
            console.log("Result of login:", result);
        }
        return result;

    },
    signup: async function signup(data: 
        { email: string; password: string; }) {
        const response = await fetch(`${baseURL}/auth/signup`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        localStorage.setItem("token", result.data.token);
        console.log("Result of signup:", result);
        return result.data;
    },
    logout: async function logout() {
        const token = localStorage.getItem("token");
        console.log("Before logout:", token);
        localStorage.removeItem("token");
        console.log("Result of logout:", token);
        return token;
    },
}

export default auth
