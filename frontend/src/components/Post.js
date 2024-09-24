    import React, { useEffect, useState } from 'react';
    import { useParams, useNavigate } from 'react-router-dom';
    import ReactMarkdown from 'react-markdown';
    import { getPostById } from '../services/api';

    const Post = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const navigate = useNavigate();  // Initiera useNavigate för att navigera tillbaka

    useEffect(() => {
        const fetchPost = async () => {
        const result = await getPostById(id);
        setPost(result);
        };
        fetchPost();
    }, [id]);

    if (!post) return <div>Loading...</div>;

    return (
        <div>
        <h1>{post.title}</h1>
        <ReactMarkdown>{post.content}</ReactMarkdown>
        
        <button onClick={() => navigate(-1)} className="btn btn-secondary mt-3">
         Return
        </button>
        </div>
        
    );
    };

    export default Post;
