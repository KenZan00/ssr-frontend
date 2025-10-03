import type React from "react";
import { useNavigate } from "react-router-dom";
import documents from "../models/documents.ts";

export default function AppForm({ currentDoc, }: {
    currentDoc?: {id: string; title: string; content: string}
    }) {
        const navigate = useNavigate();
        const submitHandling = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nativeEvent = event.nativeEvent as SubmitEvent;
        const submitter = nativeEvent.submitter as HTMLButtonElement | null;
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;
        const action = submitter?.value as string;
        const id = currentDoc?.id as string;

        if (action === 'Lägg till') {
            try {
                const newDoc = await documents.postDocument({ title, content });
                navigate("/");
                console.log("Document created:", newDoc);
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
        }

        return (
            <form onSubmit={submitHandling} className="new-doc">
                <label htmlFor="title">Titel: </label>
                <input id="title" name="title" type="text" placeholder="Title goes here" defaultValue={currentDoc?.title || ""} />

                <label htmlFor="content">Innehåll: </label>
                <textarea id="content" name="content" placeholder="Content goes here" defaultValue={currentDoc?.content || ""} />

                <button type="submit" name="action" value="Lägg till">Lägg till</button>
                <button type="submit" name="action" value="Uppdatera">Uppdatera</button>
                <input type="hidden" name="id" value={currentDoc?.id || ""}/>
            </form>
        )
    }
