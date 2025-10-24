import type React from "react";
import { useState } from "react";

interface EmailMenuFormProps {
    emails: string[];
}

export default function EmailMenuForm({ emails }: EmailMenuFormProps) {
    const [selectedEmail, setSelectedEmail] = useState("");

    const submitHandling = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Selected user email:", selectedEmail);

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

            <button type="submit">Add as Editor</button>
        </form>
    );
}
