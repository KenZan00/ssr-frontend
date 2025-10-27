import { Link } from "react-router-dom";
import DocumentsList from "../components/DocumentsList"

export default function DocumentsListView() {
    return (
        <>
            <h2>Dokument</h2>
            <Link to="/newdoc">New Document</Link>
            <DocumentsList />
        </>
    );
}
