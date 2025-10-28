import { useState, useEffect } from "react";

export default function TextSelection() {
    const [selectedText, setSelectedText] = useState("")
    const [comment, setComment] = useState("")

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
    
    function handleCommentPost() {
        console.log("Comment while pushing comment button:", comment)
    }

    function handleCommentChange(e) {
        const value = e.target.value;
        setComment(value)
        console.log("The input from comment:", value)
    }

    return (
        <div className="comments-container">
            <div className="marked-text">
                <textarea className="comments-textarea"
                    value={comment}
                    onChange={handleCommentChange}
                    ></textarea>
                <button onClick={handleCommentPost}>Comment</button>
            </div>
        </div>
    );
}
