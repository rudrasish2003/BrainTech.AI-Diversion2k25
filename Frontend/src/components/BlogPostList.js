// src/components/BlogPostList.js
import React from 'react';


const BlogPostList = () => {
    const posts = [
        { id: 1, title: 'Understanding Alzheimer’s', author: 'Dr. Smith' },
        { id: 2, title: 'Caring for Patients', author: 'Jane Doe' },
    ];

    return (
        <div className="blog-post-list">
            <h2>Blog Posts</h2>
            {posts.map(post => (
                <div key={post.id} className="blog-post">
                    <h3>{post.title}</h3>
                    <p>By {post.author}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogPostList;