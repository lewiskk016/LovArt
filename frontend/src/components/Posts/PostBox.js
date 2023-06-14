import "./PostBox.css";
import image from "./monet.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserPosts,
  fetchPosts,
  updatePost,
  fetchUserPosts,
} from "../../store/posts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Comment from "../Comments/Comments";
import React, { useState } from 'react';
import {likePostAction, unlikePostAction} from "../../store/posts"
import { useParams } from "react-router-dom";



function PostBox ({ post: { text, author: { username, profileImageUrl, _id: authorId }, imageUrls, _id: postId, likes }}) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [newText, setNewText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  const posts = useSelector((state) => state.posts);
  const images = imageUrls?.map((url, index) => {
    return <img className="post-image" key={url} src={url} alt={`postImage${index}`} />
  });

  console.log()

  const handleDelete = () => {
    dispatch(deleteUserPosts(postId));
  };

  const handleUpdate = () => {
    dispatch(updatePost(postId, newText));
    setEditMode(false);
  };

  const handleTextChange = (event) => {
    setNewText(event.target.value);
  };

  // const handleLike = () => {
  //   const hasLiked = likes.some((like) => like.authorId === currentUser._id);
  //   if (hasLiked) {
  //     dispatch(unlikePostAction(postId)).catch((error) => {
  //       if (error.message === "User has already liked this post") {
  //         // User has already liked this post, continue with unliking
  //         dispatch(likePostAction(postId));
  //       } else {
  //         // Handle other errors
  //         console.log("Error unliking post:", error);
  //       }
  //     });
  //   } else {
  //     dispatch(likePostAction(postId));
  //   }
  // };

  const handleLike = () => {
    dispatch(likePostAction(postId));
  };

  const handleUnLike = () => {
    dispatch(unlikePostAction(postId));
  };


  return (
    <div className="post-con">
      <div className="post-image">

        <div className="artist-img">{images}</div>
        
      </div>
      <div className="post-det">
        <div className="post-username">
          <div className="username"></div>
        </div>
        <div className="post-like">
          <div className="user-image">
            {profileImageUrl ? (
              <img
                className="profile-image"
                src={profileImageUrl}
                alt="profile"
              />
            ) : undefined}
          </div>
          <div className="user-username">
            <Link to={`/profile/${authorId}`}>{username}</Link>
            {/* <h3>{username}</h3> */}
          </div>
          <div className="artist-name">
            <h1>ARTIST</h1>
          </div>
        </div>
      </div>
      <div className="post-like">Likes: {likes?.length ?? 0}</div>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnLike}>UnLike</button>
      {/* <div className="post-like">
      Likes: {likes.length}
      <button onClick={handleLike}>
          {likes.some((like) => like.authorId === currentUser._id)
            ? "Unlike"
            : "Like"}
        </button>
      </div> */}
      <div className="post-description">
        {editMode ? (
          <div>
            <input type="text" value={newText} onChange={handleTextChange} />
            <button onClick={handleUpdate}>Save</button>
          </div>
        ) : (
          <p>{text}</p>
        )}
      </div>
      <div className="post-comment">
        <div className="comment">
          <Comment postId={postId} />
        </div>

      </div>
      <div>
        {currentUser._id === authorId && (
          <div>
            <button onClick={handleDelete}>Delete Post</button>
            {!editMode && (
              <button onClick={() => setEditMode(true)}>Edit Post</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostBox;
