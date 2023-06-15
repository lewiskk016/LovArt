import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../../store/comments";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as thinComment } from "@fortawesome/free-regular-svg-icons";
import { faEdit as regularEdit } from "@fortawesome/free-regular-svg-icons";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const post = useSelector((state) =>
    state.posts.all.find((post) => post._id === postId)
  );
  console.log("this is=>", postId.comment);
  const currentUser = useSelector((state) => state.session.user);
  const comments = post ? post.lastTwoComments : [];

  const [updatedComments, setUpdatedComments] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [showInputUpdate, setShowInputUpdate] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ comment, postId }));
    setComment("");
    setShowInput(false);
  };

  const handleUpdateComment = (commentId, updatedText) => {
    dispatch(updateComment({ postId, comment: updatedText, commentId }));
    setUpdatedComments({ ...updatedComments, [commentId]: "" });
    setShowInputUpdate(false);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId, postId));
  };

  const handleCommentButtonClick = () => {
    setShowInput(true);
  };
  const handleUpdateButtonClick = () => {
    setShowInput(true);
  };

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="comment-index-container">
      <div className="comment-page-container">
        {comments &&
          comments.map((comment) => (
            <div className="comment-box" key={comment._id}>
              <div className="comment-box-username">
                <img
                  src={comment.author.profileImageUrl}
                  className="comment-pfp"
                />
               <span>{comment.author.username}</span>
              </div>
              <div className="comment-box-comment">{comment.text}</div>
              {currentUser && currentUser._id === comment.author._id && (
                <div className="edit-delete-btn">
                  {!showInputUpdate && (
                    <span onClick={() => setShowInputUpdate(true)}>
                      <FontAwesomeIcon
                        icon={regularEdit}
                        style={{ color: "#0d0d0d" }}
                      />
                    </span>
                  )}
                  {showInputUpdate && (
                    <>
                      <input
                        type="text"
                        value={updatedComments[comment._id] || ""}
                        onChange={(e) =>
                          setUpdatedComments({
                            ...updatedComments,
                            [comment._id]: e.target.value,
                          })
                        }
                      />
                      <button
                        onClick={() =>
                          handleUpdateComment(
                            comment._id,
                            updatedComments[comment._id]
                          )}
                        
                          >
                        Update
                      </button>
                    </>
                  )}
                  <button   className="delete-comment-btn" onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="comment-form-container">
        {!showInput && (
          <span onClick={handleCommentButtonClick}>
            <FontAwesomeIcon icon={thinComment} style={{ color: "#0d0d0d" }} />
          </span>
        )}
        {showInput && (
          <form onSubmit={handleComment}>
            <textarea
              className="comment-form-input"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="submit-change-btn" type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Comments;
