import { Link } from "react-router-dom";
import documents from "../models/documents.ts";

const docs = await documents.getAllDocuments();

export default function DocumentsList() {
    return (
    <div className="documentsList">
        {docs.map((doc: { _id: string; title: string; content: string; created_at: string }) => (
        <p key={doc._id}> <Link to={`/${doc._id}`} state={{ doc }}>{doc.title}</Link></p>
        ))}
    </div>
    );
}
