import type React from "react";

export default function AppForm({ onSubmit }: {
    onSubmit?: (data: {title: string; content: string}) => void }) {

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
            <input id="title"name="title" type="text" placeholder="Title goes here" />

            <label htmlFor="content">Text: </label>
            <textarea id="content" name="content" />
            <button type="submit">Submit form</button>
        </form>
    )
}
