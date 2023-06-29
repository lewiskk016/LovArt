import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../../store/posts';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PostBox from '../Posts/PostBox';


const Search = () => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => Object.values(state.posts.all));
    const { query} = useParams();

    useEffect(() => {
      dispatch(fetchPosts());
    }, [dispatch]);

    useEffect(() => {
      filterPosts(query);
    }, [query]);

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

    return (
        <div className="posts-container">
          <h2>Search Results for "{query}"</h2>
          {searchResults.length === 0 ? (
            <h3 className="no-results">No results found</h3>
          ) : (
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
