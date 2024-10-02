import React,{} from 'react';
import { Link } from 'react-router-dom';
import { capitalizeTitle } from '../utils/utils';

const PostList = ({posts}) => {

  if (!posts.length) return <div>Loading...</div>;

  return (
    <div>
      <ul>
        {posts.map((post) => {
          const capitalizedTitle = capitalizeTitle(post.title);  // Använd capitalizeTitle
          return (
            <li key={post._id}>
              <Link to={`/posts/${post._id}`} className="nav-link">
                {capitalizedTitle}
              </Link> 
                {/* Visa datumet */} 
               
            </li>
          );
        })}
    </ul>    
    </div>
  );
};

export default PostList;
