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
  
  export const handleDelete = async (postId, setPosts, setMessage) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);  
        setPosts((prevPosts) => {
          const updatedPosts = prevPosts.filter((post) => post._id !== postId);
          console.log('Updated posts after deletion:', updatedPosts);  // Debugging
          return updatedPosts;
        });
 
        setMessage('Post has been deleted successfully!');
      } catch (error) {
        console.error('Failed to delete the post:', error);
      }
    }
 };
 