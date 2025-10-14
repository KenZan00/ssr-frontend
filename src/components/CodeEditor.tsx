import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Editor from "@monaco-editor/react";
import documents from "../models/documents.ts";

export default function CodeMode({ currentDoc }) {
    return (
        <>Hej! Detta kommer direkt från codeMode-komponenten</>
    )
}
