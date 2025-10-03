import type React from "react";
import auth from "../models/auth.ts";

export default function SignupForm() {
    const submitHandling = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // const nativeEvent = event.nativeEvent as SubmitEvent;
        // const submitter = nativeEvent.submitter as HTMLButtonElement | null;
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        // const action = submitter?.value as string;

        try {
            const signupResult = await auth.signup({ email, password });
            console.log("Signup complete:", signupResult);
        } catch (error) {
            console.log("Failed to signup:", error);
        }
    }

    return (
        <form onSubmit={submitHandling} className="new-doc">
            <label htmlFor="email">Email: </label>
            <input id="email" name="email" type="text" placeholder="Skriv ditt email" defaultValue="" />

            <label htmlFor="password">Lösenord: </label>
            <textarea id="password" name="password" placeholder="Skriv ditt lösenord" defaultValue="" />

            <button type="submit" name="action" value="signup">Registrera dig</button>
        </form>
    )
};
