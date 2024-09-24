    import axios from 'axios';

    const API_URL = process.env.REACT_APP_API_URL;

    export const getPosts = async () => {
    const response = await axios.get(`${API_URL}/api/posts`);
    return response.data;
    };

    export const getPostById = async (id) => {
    const response = await axios.get(`${API_URL}/api/posts/${id}`);
    return response.data;
    };

    export const createPost = async (post) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(`${API_URL}/api/posts`, post, config);
    return response.data;
    };

    