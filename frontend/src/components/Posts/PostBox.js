import "./PostBox.css";
// import image from "./monet.jpeg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserPosts,
  updatePost,
} from "../../store/posts";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Comment from "../Comments/Comments";
import React, { useState } from "react";
import { likePostAction, unlikePostAction } from "../../store/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as thinHeart } from "@fortawesome/free-regular-svg-icons";

function PostBox({
  post: {
    text,
    author: { username, profileImageUrl, _id: authorId },
    imageUrls,
    _id: postId,
    likes,
  },
}) {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [newText, setNewText] = useState(text);
  const [editMode, setEditMode] = useState(false);
  // const [likeMode, setLikeMode] = useState(
  //   likes.includes(currentUser?._id)
  // );
  const [likeMode, setLikeMode] = useState(
    currentUser && likes ? likes.includes(currentUser._id) : false
  );

  const images = imageUrls?.map((url, index) => {
    return (
      <img
        className="post-image"
        key={url}
        src={url}
        alt={`postImage${index}`}
      />
    );
  });

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
    if (likeMode) {
      dispatch(unlikePostAction(postId, currentUser._id));
      setLikeMode(false);
    } else {
      dispatch(likePostAction(postId, currentUser._id));
      setLikeMode(true);
    }
  };


  return (
    
      <div className="index-page-right-side">
      <div className="right-side-art-box">
           <div className="artist-img">{images}</div>
      </div>
      <div className="index-left-side">
        <div className="paper-box">
        <div className="post-det">
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
       </div>
        <div className="post-title">
        {" "}
          {editMode ? (
            <div className="save-btn">
              <input type="text" value={newText} onChange={handleTextChange} />
              <button onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <p>{text}</p>
          )}
        </div>     
      </div>

      <div className="post-like-comments">
        <div className="post-like-btn">
          <span onClick={handleLike}>
            {likeMode ? (
              <FontAwesomeIcon
                icon={solidHeart}
                style={{ color: "#ff0000", cursor: "pointer" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={thinHeart}
                style={{ color: "#000000", cursor: "pointer" }}
              />
            )}
          </span>
        </div>
          <div className="post-like"> {likes?.length ?? 0}</div>
      </div>
      <div className="post-comment">
        <div className="comment">
          <Comment postId={postId} />
        </div>
      </div>

      <div>
        {currentUser._id === authorId && (
          <div className="delete-edit-post-btn">
            {!editMode && (
              <button onClick={() => setEditMode(true)} className="edit-post-btn">Edit Post</button>
            )}
            <button onClick={handleDelete} className="delete-post-btn">Delete Post</button>
          </div>
        )}
      </div>

        </div>



      </div>
    </div>









    //---------------------------------
    // <div className="post-con">
    //   <div className="post-image">
    //     <div className="artist-img">{images}</div>

    //   </div>
    //   <div className="post-det">
    //     <div className="user-image">
    //       {profileImageUrl ? (
    //         <img
    //           className="profile-image"
    //           src={profileImageUrl}
    //           alt="profile"
    //         />
    //       ) : undefined}
    //     </div>

    //     <div className="user-username">
    //       <Link to={`/profile/${authorId}`}>{username}</Link>
          /* <h3>{username}</h3> */
        /* </div>
        <div className="post-title">
        {" "}
          {editMode ? (
            <div className="save-btn">
              <input type="text" value={newText} onChange={handleTextChange} />
              <button onClick={handleUpdate}>Save</button>
            </div>
          ) : (
            <p>{text}</p>
          )}
        </div>
      
      </div>

      <div className="post-like-comments">
        <div className="post-like-btn">
          <span onClick={handleLike}>
            {likeMode ? (
              <FontAwesomeIcon
                icon={solidHeart}
                style={{ color: "#ff0000", cursor: "pointer" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={thinHeart}
                style={{ color: "#000000", cursor: "pointer" }}
              />
            )}
          </span>
        </div>
          <div className="post-like"> {likes?.length ?? 0}</div>
      </div>
      <div className="post-comment">
        <div className="comment">
          <Comment postId={postId} />
        </div>
      </div>
      <div>
        {currentUser._id === authorId && (
          <div className="delete-edit-post-btn">
            <button onClick={handleDelete} className="delete-post-btn">Delete Post</button>
            {!editMode && (
              <button onClick={() => setEditMode(true)} className="edit-post-btn">Edit Post</button>
            )}
          </div>
        )}
      </div>
    </div> */
  );
}

export default PostBox;
