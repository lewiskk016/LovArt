// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPosts } from '../../store/posts';
// import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
// import PostBox from '../Posts/PostBox';
// import '../Posts/PostBox.css';
// import './Search.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import art from './kelly-sikkema-mdADGzyXCVE-unsplash.jpg';

// const Search = () => {
//     const dispatch = useDispatch();
//     const posts = useSelector((state) => Object.values(state.posts.all));
//     const { query} = useParams();

//     useEffect(() => {
//       dispatch(fetchPosts());
//     }, [dispatch]);

//     useEffect(() => {
//       filterPosts(query);
//     }, [query]);

//     const filterPosts = (query) => {
//         if (!posts || posts.length === 0) {
//           return [];
//         }

//         const lowerCaseQuery = query.toLowerCase();
//         return posts.filter((post) => {
//           const username = post.author.username.toLowerCase();
//           const text = post.text.toLowerCase();
//           return username.includes(lowerCaseQuery) || text.includes(lowerCaseQuery);
//         });
//       };

//     const searchResults = filterPosts(query);


//     return (
//         <div className="posts-container">
//           <div className="picture-frame">
//              <img src={art} alt="Picture" className="picture" />
//             <div className="search-results">
//               <h2 className="search-results2">Search Results for "{query}"</h2>
//               <br></br>
//               <h2 className="scroll-down">please scroll down...</h2>
//           </div>
//               </div>

//           {searchResults.length === 0 ? (
//             <h3 className="no-results">No results found</h3>
//           ) : (
//             <div className="posts-container">
//               {searchResults.map((post) => (
//                 <PostBox key={post._id} post={post} />
//               ))}
//             </div>
//           )}
//         </div>
//       );
//     }

// export default Search



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { useParams } from 'react-router-dom';
import PostBox from '../Posts/PostBox';
import '../Posts/PostBox.css';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import art from './kelly-sikkema-mdADGzyXCVE-unsplash.jpg';

const Search = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts.all));
  const { query } = useParams();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const filterPosts = (query) => {
    if (!posts || posts.length === 0) {
      return [];
    }

    const lowerCaseQuery = query.toLowerCase();
    return posts.filter((post) => {
      const username = post.author.username.toLowerCase();
      const text = post.text.toLowerCase();
      return username.includes(lowerCaseQuery) || text.includes(lowerCaseQuery);
    });
  };

  const searchResults = filterPosts(query);
  const numberOfResults = searchResults.length;

  return (
    <div className="posts-container">
      <div className="picture-frame">
        <img src={art} alt="Picture" className="picture" />
        <div className="search-results">
          <h2 className="search-results2">
          {numberOfResults} {numberOfResults === 1 ? 'result' : 'results'} for "{query}"
          </h2>
          {numberOfResults > 0 && (
            <h3 className="scroll-down">
             Please scroll down
            </h3>
          )}
        </div>
      </div>
      {numberOfResults > 0 && (
        <div className="posts-container">
          {searchResults.map((post) => (
            <PostBox key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
