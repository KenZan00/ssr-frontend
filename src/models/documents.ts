import { baseURL } from "../utils/utils.ts";

const documents = {
    getAllDocuments: async function getAllDocuments() {

        const response = await fetch(`${baseURL}/`, {
            method: 'GET'
        });

        const result = await response.json();
        console.log("Documents:", result.data);
        return result.data;
    },
    postDocument: async function postDocument(data: 
        { title: string; content: string; action: string; id?: string; }) {

        const response = await fetch(`${baseURL}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log("Result of postDocument:", result);
        return result.data;
    },

}

export default documents
