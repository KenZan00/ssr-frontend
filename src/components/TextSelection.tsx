import { useState, useEffect } from "react";

export default function TextSelection() {
    const [selectedText, setSelectedText] = useState("")

    useEffect(() => {
        function handleSelection() {
            const selectedText = window.getSelection()?.toString();
            setSelectedText(selectedText)
            if (selectedText) {
                console.log(selectedText)    
            }
        }

        document.addEventListener("selectionchange",
            handleSelection
        );

        return () => {
            document.removeEventListener("selectionchange",
                handleSelection
            )
        }
    }, []);
    return null;
}
