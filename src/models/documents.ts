import { baseURL } from "../utils/utils.ts";

const documents = {
    getAllDocuments: async function getAllDocuments() {
        // const token = localStorage.getItem("token");
        // // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGxlQGdtYWlsLmNvbSIsImlhdCI6MTc1OTI2NTI0NywiZXhwIjoxNzU5ODcwMDQ3fQ.v6PSdOVAI2D4iCXNsrNv_ltRS5MrN2GIJEgrVmMl4Ak"
        
        // if (!token) {
        //     const navigate = useNavigate();
        //     navigate("/login");
        // }
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseURL}/documents`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const result = await response.json();
        console.log("Documents:", result.data);
        return result.data;
    },
    postDocument: async function postDocument(data: 
        { title: string; content: string; }) {
        // const token = localStorage.getItem("token");
        // // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGxlQGdtYWlsLmNvbSIsImlhdCI6MTc1OTI2NTI0NywiZXhwIjoxNzU5ODcwMDQ3fQ.v6PSdOVAI2D4iCXNsrNv_ltRS5MrN2GIJEgrVmMl4Ak"

        // if (!token) {
        //     const navigate = useNavigate();
        //     navigate("/login");
        // }
        const token = localStorage.getItem("token");
        const response = await fetch(`${baseURL}/documents`, {
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
    patchDocument: async function patchDocument(data: 
        { title: string; content: string; id: string; }) {
        // const token = localStorage.getItem("token");
        // // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthbGxlQGdtYWlsLmNvbSIsImlhdCI6MTc1OTI2NTI0NywiZXhwIjoxNzU5ODcwMDQ3fQ.v6PSdOVAI2D4iCXNsrNv_ltRS5MrN2GIJEgrVmMl4Ak"

        // if (!token) {
        //     const navigate = useNavigate();
        //     navigate("/login");
        // }
        const token = localStorage.getItem("token");
        const id = data.id;
        const response = await fetch(`${baseURL}/documents/${id}`, {
            method: 'PATCH',
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

export default documents
