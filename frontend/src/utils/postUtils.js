import { deletePost } from '../services/api';

  
export const getTrimmedContent = (content, contentLengthLimit, isExpanded) => {
    if (!isExpanded && content.length > contentLengthLimit) {
      return {
        trimmedContent: `${content.slice(0, contentLengthLimit)}...`,
        isTrimmed: true,
      };
    }
    return {
      trimmedContent: content,
      isTrimmed: false,
    };
  };
  
  export const processHashtagsInHTML = (htmlContent) => {
    const hashtagRegex = /#(\w+)/g;
    return htmlContent.replace(hashtagRegex, (match, tag) => {
      return `<a href="#" class="btn btn-outline-secondary btn-sm btn-weight-bold" data-hashtag="${tag}">${match}</a>`;
    });
  };
  
  export const handleDelete = async (postId, setPosts, setMessage, navigate) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        // Delete the post through API call
        await deletePost(postId);
  
        // Update the state to remove the deleted post
        setPosts((prevPosts) => {
          if (!Array.isArray(prevPosts)) {
            console.error('prevPosts is not an array:', prevPosts);
            return prevPosts;
          }
  
          const updatedPosts = prevPosts.filter((post) => post._id !== postId);
          setMessage('Post has been deleted successfully!');
          return updatedPosts;
        });
  
        // Optionally, navigate if you want to go back to the home page after deletion
        if (window.location.pathname === `/posts/${postId}`) {
          setMessage('Post has been deleted successfully!');
          setTimeout(() => navigate('/'), 1000);
        }
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    }
  };
  
  
  