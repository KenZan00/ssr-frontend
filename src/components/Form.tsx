import type React from "react";
import documents from "../models/documents.ts";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

const SERVER_URL = "http://localhost:3000";

export default function AppForm({ currentDoc, }: {
    // onSubmit?: (data: {title: string; content: string}) => void;
    currentDoc?: {id: string; title: string; content: string}
    }) {

        const [title, setTitle] = useState("");
        const [content, setContent] = useState("");

        const socket = useRef(null);

        useEffect(() => {
            socket.current = io(SERVER_URL);

            socket.current.on("title", (data) => {
                setTitle(data);
            });
            
            socket.current.on("content", (data) => {
                setContent(data);
            });

            return () => {
                socket.current.disconnect();
            }
        }, []);

        useEffect(() => {
            setTitle(currentDoc?.title || "");
            setContent(currentDoc?.content || "");

        }, [currentDoc?.id, currentDoc?.title, currentDoc?.content]);

        function handleContentChange(e) {
            const value = e.target.value;
            socket.current.emit("content", value);
        }

        function handleTitleChange(e) {
            const value = e.target.value;
            socket.current.emit("title", value);
        }

        const submitHandling = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            const nativeEvent = event.nativeEvent as SubmitEvent;
            const submitter = nativeEvent.submitter as HTMLButtonElement | null;
            const formData = new FormData(event.currentTarget);
            const title = formData.get('title') as string;
            const content = formData.get('content') as string;
            const action = submitter?.value as string;
            let id = formData.get('id') as string;
            if (action === 'Lägg till') {
                id = '';
            }
            const inputs = { title, content, action, id };

            try {
                const savedDoc = await documents.postDocument(inputs);
                console.log("Document saved:", savedDoc);
            //   onSubmit?.({ title, content });
            //   console.log( title, content );
            } catch (error) {
                console.log("Failed to save document:", error);
            }
        }

        return (
            <form onSubmit={submitHandling} className="new-doc">
                <label htmlFor="title">Titel: </label>
                <input 
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title goes here"
                    value={title}
                    onChange={handleTitleChange}
                />

                <label htmlFor="content">Innehåll: </label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Content goes here"
                    value={content}
                    onChange={handleContentChange}
                />

                <button type="submit" name="action" value="Lägg till">Lägg till</button>
                <button type="submit" name="action" value="Uppdatera">Uppdatera</button>
                <input type="hidden" name="id" value={currentDoc?.id || ""}/>
            </form>
        )
    }
