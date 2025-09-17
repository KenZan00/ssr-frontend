import { Link } from "react-router-dom";
import { testData } from "../data/testData";

export default function DocumentsList() {
    return (
    <div className="documentsList">
        <h2>All documents</h2>
        {testData.map((doc) => (
        <p key={doc.id}> <Link to={`/${doc.id}`}>{doc.title}</Link></p>
        ))}
    </div>
    );
}
