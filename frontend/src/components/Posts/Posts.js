import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPostErrors, fetchPosts } from "../../store/posts";
import PostBox from "./PostBox";
import "./PostBox.css";
import React from "react";
import art from "./lovart-logo-white.png"

function Posts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => Object.values(state.posts.all));

  useEffect(() => {
    dispatch(fetchPosts());
    return () => dispatch(clearPostErrors());
  }, [dispatch]);

  if (posts.length === 0) return   (
  <div className="loading-container"> 
    <img src={art} className="loading-art"/> 
  </div>
  );
  

  return (
    // <div className="post-index-container">
      <div className="finally-happen">
        {posts.map((post) => (
          <PostBox key={post._id} post={post} />
        ))}
      // </div>
    // </div>
  );
}

export default Posts;

