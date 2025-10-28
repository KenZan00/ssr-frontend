import type React from "react";
import { useState } from "react";
import invitations from "../models/invitations.ts";
import { baseURL } from "../utils/utils.ts";

interface EmailMenuFormProps {
    emails: string[];
    id: string;
    title: string;
}

export default function EmailMenuForm({ emails, id, title }: EmailMenuFormProps) {
    const [selectedEmail, setSelectedEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const submitHandling = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!selectedEmail.trim() || !id || loading) return;
        setLoading(true);

        try {
            const inputs = { email: selectedEmail, url: baseURL, id: id, name: title };
            const sendResult = await invitations.send(inputs);
            alert(sendResult);
            setErrorMessage('');
            console.log(sendResult);
        } catch (error) {
            console.log(error);
            setErrorMessage("Failed to send invitation mail...");
            alert(errorMessage);
        } finally {
            setLoading(false);
        }

    };

    return (
        <form onSubmit={submitHandling} className="email-menu-form">
            <label htmlFor="email">Select user email:</label>
            <select
                id="email"
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
            >
                <option value="">-- Choose an email --</option>
                {emails.map((email) => (
                    <option key={email} value={email}>
                        {email}
                    </option>
                ))}
            </select>

            <button type="submit" className="submit-button">Add as Editor</button>
        </form>
    );
}
