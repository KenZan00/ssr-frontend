import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import documents from "../models/documents.ts";

const SERVER_URL = "http://localhost:3000";

export default function CodeMode({ currentDoc, }: {
    currentDoc?: {id: string; title: string; content: string}
    }) {
    
        const [editorContent, setEditorContent] = useState('')

        const socket = useRef(null);

        useEffect(() => {
            socket.current = io(SERVER_URL);

            // if(currentDoc?.id) {
            socket.current.emit('create', "1")
            // }

            socket.current.on('code', (data) => {
                // setTitle(data.title);
                setEditorContent(data.editorContent)
            });

            return () => {
                socket.current.disconnect();
            }
        }, [currentDoc?.id]);

        function handleEditorChange(content: string | undefined) {
            // console.log('here is the current model value:', value);
            const value = content ?? "";
            setEditorContent(value);

            socket.current.emit("code", {
                _id: "1",
                title: 'itel1',
                editorContent: value
            });
        }

        return (
        <Editor
        className="code-editor"
        height="90vh"
        width="100%"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue="// some comment"
        value={editorContent}
        onChange={handleEditorChange}
        options={{
            fontSize: 20,
        }}
        />
    )
}
