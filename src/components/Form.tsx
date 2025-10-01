import type React from "react";
import documents from "../models/documents.ts";
import socket from "../utils/socketio.js"

// import { testData } from "../data/testData";


export default function AppForm({ currentDoc, }: {
    // onSubmit?: (data: {title: string; content: string}) => void;
    currentDoc?: {id: string; title: string; content: string}
    }) {

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
                <input id="title"name="title" type="text" placeholder="Title goes here" defaultValue={currentDoc?.title || ""} />

                <label htmlFor="content">Innehåll: </label>
                <textarea id="content" name="content" placeholder="Content goes here" defaultValue={currentDoc?.content || ""} />

                <button type="submit" name="action" value="Lägg till">Lägg till</button>
                <button type="submit" name="action" value="Uppdatera">Uppdatera</button>
                <input type="hidden" name="id" value={currentDoc?.id || ""}/>
            </form>
        )
    }
