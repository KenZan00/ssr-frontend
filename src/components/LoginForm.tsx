import type React from "react";
import { useNavigate } from "react-router-dom";
import auth from "../models/auth.ts";


export default function LoginForm() {
    const navigate = useNavigate();
    const submitHandling = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const nativeEvent = event.nativeEvent as SubmitEvent;
        // const submitter = nativeEvent.submitter as HTMLButtonElement | null;
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        // const action = submitter?.value as string;

            const loginResult = await auth.login({ email, password });
            if (loginResult?.data?.type === 'success') {
                navigate("/");
            }
            if (loginResult?.errors?.[0]?.status === 401) {
                alert(loginResult.errors[0].detail);
            }
        }

        // try {
        //     console.log("Login complete:", loginResult);
        //     navigate("/");
        // } catch (error) {
        //     console.log("Failed to login:", error);
        // }


    return (
        <form onSubmit={submitHandling} className="new-doc">
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" type="text" placeholder="Skriv ditt email" defaultValue="" />

            <label htmlFor="password">Lösenord: </label>
            <textarea id="password" name="password" placeholder="Skriv ditt lösenord" defaultValue="" />

            <button type="submit" name="action" value="login">Logga in</button>
        </form>
    )
};
