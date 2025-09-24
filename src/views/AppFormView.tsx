import { useLocation } from "react-router-dom";
import AppForm from "../components/Form";

export default function AppFormView() {
    const { state } = useLocation();
    const doc = state?.doc;

    return <div className="app-form">
                <h2>Dokument</h2>
                <AppForm
                    currentDoc={doc && { id: doc._id, title: doc.title, content: doc.content }}
                />
            </div>
}
