// src/components/BlogPostCreation.js
import React, { useState } from 'react';


const BlogPostCreation = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle post creation logic
    };

    return (
        <form onSubmit={handleSubmit} className="blog-post-creation">
            <h2>Create a New Blog Post</h2>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" required />
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Post Body" required />
            <button type="submit">Submit</button>
        </form>
    );
};

export default BlogPostCreation;