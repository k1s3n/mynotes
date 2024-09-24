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

    // Uppdatera ett inlägg
    export const updatePost = async (id, updatedPost) => {
    const token = localStorage.getItem('token');  // Hämta token för autentisering
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/api/posts/${id}`, updatedPost, config);
    return response.data;
    };

    export const deletePost = async (id) => {
        const token = localStorage.getItem('token');  // Hämta JWT-token från localStorage
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,  // Skicka token i Authorization-headern
          },
        };
      
        // Gör DELETE-anropet till API:et med korrekt token
        const response = await axios.delete(`${API_URL}/api/posts/${id}`, config);
        return response.data;
      };

    