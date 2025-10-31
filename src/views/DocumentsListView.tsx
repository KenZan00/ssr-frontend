import { Link } from "react-router-dom";
import DocumentsList from "../components/DocumentsList"

export default function DocumentsListView() {
    return (
        <>
            <h2>Dokument</h2>
                <div className="new-doc-links">
                    <Link to="/newdoc" className="sign-up">Nytt Text Document</Link>
                    <Link to="/code" className="sign-up">Nytt Code Document</Link>
                </div>
            <DocumentsList />
        </>
    );
}
