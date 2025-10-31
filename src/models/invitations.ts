import { baseURL } from "../utils/utils.ts";

const invitations = {
    send: async function send(data: 
        { email: string; url: string; id: string; name: string; }) {
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseURL}/invitations`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Result of send:", result);
        return result.data;
    },

}

export default invitations
