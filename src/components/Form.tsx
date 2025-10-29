import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import documents from "../models/documents.ts";
import EmailMenuForm from "./EmailMenuForm.tsx"
import TextSelection from "./TextSelection.tsx";
import { extractUser } from "../utils/email.ts";


const SERVER_URL = "http://localhost:3000";

export default function AppForm({ currentDoc, }: {
    currentDoc?: { id: string; title: string; content: string }
}) {
    const [emailMenuVisible, setEmailMenuVisible] = useState(false);
    const [availableUserEmails, setAvailableUserEmails] = useState(['']);
    const navigate = useNavigate();
    const [currentUserEmail] = useState(extractUser);

    //Socket states
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [recieveComment, setRecieveComment] = useState<CommentIntf[]>([]);

    const socket = useRef<Socket | null>(null);

    interface DocumentIntf {
        title: string;
        content: string;
    };

    interface CommentIntf {
        _id: string;
        text: string;
        user: string;
        commentTxt: string;
    }

    //Useeffect handling socket creation and data handling
    useEffect(() => {
        socket.current = io(SERVER_URL);

        if(currentDoc?.id) {
            socket.current.emit('create', currentDoc.id)
        }

        socket.current.on('doc', (data: DocumentIntf) => {
            setTitle(data.title);
            setContent(data.content)
        });

        socket.current.on('comment', (data: CommentIntf) => {
            // console.log("DATA från socket Comment", data)
            setRecieveComment(prev => [...prev, data]);
        })

        return () => {
            socket.current?.disconnect();
        }
    }, [currentDoc?.id]);

    // Useeffect handling incoming title and content from prop 
    useEffect(() => {
        setTitle(currentDoc?.title || "");
        setContent(currentDoc?.content || "");

    }, [currentDoc?.id, currentDoc?.title, currentDoc?.content]);

    function handleContentChange(e) {
        const value = e.target.value;
        //Set content due rooms broadcast on server and not emits to all.
        setContent(value)

        if (currentDoc?.id ) {
            socket.current?.emit("doc", {
                _id: currentDoc.id || "",
                title,
                content: value,
                user: currentUserEmail
            });
        }
    }

    function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setTitle(value);

        if (currentDoc?.id) {
            socket.current?.emit("doc", {
                _id: currentDoc.id || "",
                title: value,
                content,
                user: currentUserEmail
            });
        }
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
        
        const type = "text"
        const inputs = { title, content, action, id, type };

        if (action === 'Lägg till') {
            try {
                const savedDoc = await documents.postDocument(inputs);
                console.log("Document saved:", savedDoc);
                
                navigate("/");

                //   onSubmit?.({ title, content });
                //   console.log( title, content );

            } catch (error) {
                console.log("Failed to save document:", error);
            }
        }

        if (action === 'Uppdatera') {
            try {
                const savedDoc = await documents.patchDocument({ title, content, id });
                alert('Updated')
                console.log("Document saved:", savedDoc);
            } catch (error) {
                console.log("Failed to save document:", error);
            }
        }

        if (action === 'Dela') {
            try {
                const availableUserEmails = await documents.shareDocumentUsers({ id });
                setAvailableUserEmails(availableUserEmails)
                setEmailMenuVisible(true);
                alert('Dela')
                console.log("Document saved:", availableUserEmails);
            } catch (error) {
                console.log("Failed to save document:", error);
            }
        }
    }

    return (
        <div>
            <div className="text-editor-wrapper">
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
                    className="content-editor"
                    id="content"
                    name="content"
                    placeholder="Content goes here"
                    value={content}
                    onChange={handleContentChange}
                />

                <button className="blue-button" type="submit" name="action" value="Lägg till">Lägg till</button>
                <button className="blue-button" type="submit" name="action" value="Uppdatera">Uppdatera</button>
                <button className="blue-button" type="submit" name="action" value="Dela">Dela</button>
                <input className="blue-button" type="hidden" name="id" value={currentDoc?.id || ""} />
            </form>

            {socket.current && (
                <div className="comments-box">
                <label>Comments: </label>
                <TextSelection socket={socket.current} currentDoc={currentDoc} comments={recieveComment} />
                </div>
            )}
        </div>
            {emailMenuVisible && <EmailMenuForm emails={availableUserEmails} 
            id={currentDoc?.id || ''} title={title} />}

            
        </div>


    )
}
