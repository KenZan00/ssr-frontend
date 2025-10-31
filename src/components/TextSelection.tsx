import { useState, useEffect } from "react";
import { extractUser } from "../utils/email.ts";
import type { Socket } from "socket.io-client";


interface TextSelectIntf {
    socket: Socket;
    currentDoc: {
        id: string;
        title: string;
        content: string;
    };
    
    comments: Array <{
        id: string;
        text: string;
        commentTxt: string;
        user: string;
    }>;
}

export default function TextSelection( { socket, currentDoc, comments }: TextSelectIntf) {
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

    function handleCommentPost() {
        console.log("Comment while pushing comment button:", comment)

        const oneComment = {
            user: extractUser(),
            _id: currentDoc.id,
            text: selectedText,
            commentTxt: comment
        }

        console.log("Fully built socket emit object from user:", oneComment)
        socket.emit("comment", oneComment);

        setComment("");
    }

    function handleCommentChange(e) {
        const value = e.target.value;
        setComment(value)
        console.log("The input from comment:", value)
    }

    function renderComment(comment, index) {
        return (
        <div key={index}>
            <p className="username-comment">{comment.user} on: <span className="comment-quote">"{comment.text}"</span></p>
            <p className="comment-text">- {comment.commentTxt}</p>
        </div>
        );
    }

    return (
        <div className="comments-container">
            <div className="marked-text">
                <textarea
                    className="comments-textarea"
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <button onClick={handleCommentPost}>Comment</button>
            </div>

            <div className="list-comments">
            {comments?.map(renderComment)}
            </div>
        </div> 
    )
};
