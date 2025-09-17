import type React from "react";
// import { testData } from "../data/testData";


export default function AppForm({ onSubmit, currentDoc, }: {
    onSubmit?: (data: {title: string; content: string}) => void;
    currentDoc?: {id: string; title: string; content: string}
}) {

    const submitHandling = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const title = formData.get('title') as string;
        const content = formData.get('content') as string;

        onSubmit?.({ title, content });
        console.log({ title, content });
    }

    return (
        <form onSubmit={submitHandling}>
            <label htmlFor="title">Titel: </label>
            <input id="title"name="title" type="text" placeholder="Title goes here" defaultValue={currentDoc?.title || ""} />

            <label htmlFor="content">Text: </label>
            <textarea id="content" name="content" placeholder="Content goes here" defaultValue={currentDoc?.content || ""} />

            <button type="submit" name="action" value="Lägg till">Lägg till</button>
            <button type="submit" name="action" value="Uppdatera">Uppdatera</button>
            <input type="hidden" name="id" value={currentDoc?.id || ""}/>
        </form>
    )
}
