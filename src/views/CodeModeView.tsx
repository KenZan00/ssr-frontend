import { useLocation } from "react-router-dom";
import CodeMode from "../components/CodeEditor";

export default function CodeModeView() {
    const { state } = useLocation();
    const doc = state?.doc;

    return (
        <div className="code-editor-view">
        <h2>Code Mode</h2>
            <CodeMode currentDoc={doc && { id: doc._id, title: doc.title, content: doc.content }} />
        </div>
    );
}
