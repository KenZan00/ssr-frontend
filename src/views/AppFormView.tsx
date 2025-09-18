import { useParams } from "react-router-dom";
import { testData } from "../data/testData";
import AppForm from "../components/Form";

export default function AppFormView() {
    const { id } = useParams();
    const doc = testData.find((documentId) => documentId.id === id);

    return <div className="app-form">
                <h2>Dokument</h2>
                <AppForm currentDoc={doc} />
            </div>
}
