import { baseURL } from "../Utils.tsx";

const documents = {
    getAllDocuments: async function getAllDocuments() {

        const response = await fetch(`${baseURL}/`, {
            method: 'GET'
        });

        const result = await response.json();
        console.log("Documents:", result.data);
        return result.data;
    }
}

export default documents
