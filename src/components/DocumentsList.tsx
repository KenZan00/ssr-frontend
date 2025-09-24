import { Link } from "react-router-dom";
// import { testData } from "../data/testData";
import documents from "../models/documents.js";

const docs = await documents.getAllDocuments();

export default function DocumentsList() {
    return (
    <div className="documentsList">
        {docs.map((doc) => (
        <p key={doc._id}> <Link to={`/${doc._id}`}>{doc.title}</Link></p>
        ))}
    </div>
    );
}
