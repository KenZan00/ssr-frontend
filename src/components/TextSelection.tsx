import { useState, useEffect } from "react";

export default function TextSelection( { socket, currentDoc }: any) {
    const [selectedText, setSelectedText] = useState("")
    const [comment, setComment] = useState("")

    function handleSelection() {
        const selection = window.getSelection()?.toString();
        console.log("captured text", selection)
        
        if (selection) {
            setSelectedText(selection);
            }
        }

    useEffect(() => {
        document.addEventListener("mouseup", handleSelection);
        
        return () => { 
            document.removeEventListener("mouseup", handleSelection);
            }
    }, []);

    function extractUser() {
        const token = localStorage.getItem("token")

        let username=""

        if (!token) {
            username = "incognito"
            return username
            } else {
                const tokenDecoded = JSON.parse(atob(token.split(".")[1]));
                const user = tokenDecoded.email;
                console.log("Decoded token", tokenDecoded)
                console.log("User", user)
                return user
            }
        }

    function handleCommentPost() {
        console.log("Comment while pushing comment button:", comment)

        const oneComment = {
            user: extractUser(),
            docId: currentDoc.id,
            text: selectedText,
            commentTxt: comment
        }

        console.log("Fully built socket emit object from user:", oneComment)

        setComment("");
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
