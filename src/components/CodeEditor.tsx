import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import documents from "../models/documents.ts";

export default function CodeMode({ currentDoc }) {

    const [editorValue, setEditorValue] = useState('')

    function handleEditorChange(value) {
        console.log('here is the current model value:', value);
        setEditorValue(value)
    }

    return (
    <Editor
    className="code-editor"
    height="90vh"

    theme="vs-dark"
    defaultLanguage="javascript"
    defaultValue="// some comment"
    value={editorValue}
    onChange={handleEditorChange}
    options={{
        fontSize: 20,
    }}
    />
    )
}
