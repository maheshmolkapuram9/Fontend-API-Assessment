import React, { useState } from "react";
import "./Postform.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewPost } from "../../Redux/Posts/postsSlice";
import { DataItem } from "../Home/Home";

const PostForm = () => {
    const [userId, setUserId] = useState<number | "">("");
    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const randomNumber = Math.floor(Math.random() * (1000 - 101 + 1)) + 101;
        const postData: DataItem = { userId: Number(userId), id: randomNumber, title, body };
        dispatch(addNewPost(postData));
        console.log("new post added:", postData);
        setTitle("");
        setUserId("");
        setBody("");
        navigate("/");
    }

    return (
        <div className="post-form-container">
            <form onSubmit={handleSubmit}>
                <h3>Add a new post</h3>
                <label htmlFor="userId">User Id</label>
                <input
                    type="number"
                    id="userId"
                    placeholder="Enter your userId (Must be a Number)"
                    required
                    value={userId}
                    onChange={e => setUserId(e.target.value ? Number(e.target.value) : "")}
                />
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    placeholder="Enter the title"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    placeholder="Enter the body here"
                    required
                    value={body}
                    onChange={e => setBody(e.target.value)}>
                </textarea>
                <input className="button"
                    type="submit"
                    value="Add"
                />
            </form>
            <p>Go back to the posts:
                <Link to="/"> click here</Link>
            </p>
        </div>
    );
}

export default PostForm;
