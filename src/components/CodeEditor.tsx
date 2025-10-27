import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import documents from "../models/documents.ts";

const SERVER_URL = "http://localhost:3000";

export default function CodeMode({ currentDoc, }: {
    currentDoc?: {id: string; title: string; content: string}
    }) {

        const [title, setTitle] = useState(currentDoc?.title || "");
        const [editorContent, setEditorContent] = useState(currentDoc?.content || '')
        const [codeOutput, setCodeOutput] = useState('Here comes the output from code runs')

        const socket = useRef(null);

        useEffect(() => {
            socket.current = io(SERVER_URL);

            if(currentDoc?.id) {
            socket.current.emit('create', currentDoc.id)
            }

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
                _id: currentDoc?.id || "",
                title,
                editorContent: value
            });
        }
        
        function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
            const value = e.target.value;
            setTitle(value);
        }

        function runCode() {
            const result = 'Api-call return result from model is here for me :)'
            setCodeOutput(result)
            console.log('Code successfully sent into space somewhere')
        }

        // const inputs = { title, content, action: "Lägg till", id: "", type: "code" };

        async function saveCode() {
            const inputs = {
                title: title || "Testtitel som bara fungerar en gång",
                content: editorContent,
                id: currentDoc?.id || "",
                type: "code"
            };

            try {
                const savedDoc = await documents.postDocument(inputs);
                console.log("Document saved:", savedDoc);
            } catch (error) {
                console.log("Failed to save document:", error);
            }
        }

        return (
        <>
            <label htmlFor="title">Titel: </label>
            <input
                id="title"
                name="title"
                type="text"
                placeholder="Title goes here"
                value={title}
                onChange={handleTitleChange}
            />       
        
        <div>
            <button onClick={runCode}>Run Code</button>
        </div>

        <div className="monaco-container">
            <div className="monaco-editor-box">
                <Editor
                className="code-editor"
                height="75vh"
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
            </div>
            <div className="monaco-output-box">
                <pre>{codeOutput}</pre>
            </div>
            <button onClick={saveCode}>Lägg till</button>
        </div>
        </>
    )
}
