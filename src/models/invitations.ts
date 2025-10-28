import { baseURL } from "../utils/utils.ts";

const invitations = {
    send: async function send(data: 
        { title: string; content: string; }) {
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
        console.log("Result of postDocument:", result);
        return result.data;
    },
   
}

export default invitations
