import { Link } from "react-router-dom";
import documents from "../models/documents.ts";
import socket from "../utils/socketio.js"

socket.on('FromBackend', data => {
    console.log(data)
    //After frombackend
    socket.emit('FromFrontend', "Hi, this is frontend speaking")
})

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
