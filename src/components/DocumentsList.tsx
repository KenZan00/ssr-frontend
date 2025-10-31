import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import documents from "../models/documents.ts";

// const docs = await documents.getAllDocuments();

export default function DocumentsList() {
    const [docs, setDocs] = useState({"owner": [], "editor": []});

    useEffect(() => {
        const loadDocs = async () => {
            try {
                const allDocs = await documents.getAllDocuments();
                setDocs(allDocs);
            } catch (error) {
                console.error("Failed to load documents", error);
            }
        };

        loadDocs();
    }, []);
    return (
        <div className="documentsList">

            <h3>Mina egna dokument:</h3>
            {docs.owner.map((doc: { _id: string; title: string; content: string; created_at: string; type: string }) => (
                <p key={doc._id}>
                    <Link to={doc.type === 'code' ? `/code/${doc._id}` : `/${doc._id}`}
                        state={{ doc }}>{doc.title}</Link>
                </p>
            ))}
            <h3>Dokument skapad av andra jag får uppdatera:</h3>
            {docs.editor.map((doc: { _id: string; title: string; content: string; created_at: string; type: string }) => (
                <p key={doc._id}>
                    <Link to={doc.type === 'code' ? `/code/${doc._id}` : `/${doc._id}`}
                        state={{ doc }}>{doc.title}</Link></p>
            ))}
        </div>
    );
}
