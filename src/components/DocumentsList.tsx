import { Link } from "react-router-dom";
import documents from "../models/documents.ts";

const docs = await documents.getAllDocuments();

export default function DocumentsList() {

    return (
        <div className="documentsList">
        
        <h3>Mina egna dokument:</h3>
        {docs.owner.map((doc: { _id: string; title: string; content: string; created_at: string }) => (
            <p key={doc._id}> <Link to={`/${doc._id}`} state={{ doc }}>{doc.title}</Link></p>
        ))}
        <h3>Dokument skapad av andra jag får uppdatera:</h3>
        {docs.editor.map((doc: { _id: string; title: string; content: string; created_at: string }) => (
            <p key={doc._id}> <Link to={`/${doc._id}`} state={{ doc }}>{doc.title}</Link></p>
        ))}
    </div>
    );
}
