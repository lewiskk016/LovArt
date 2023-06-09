import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../../store/comments";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment as thinComment } from "@fortawesome/free-regular-svg-icons";
import { faEdit as regularEdit } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const post = useSelector((state) =>
    state.posts.all.find((post) => post._id === postId)
  );
  const currentUser = useSelector((state) => state.session.user);
  const comments = post ? post.lastTwoComments : [];

  const [updatedComments, setUpdatedComments] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showNewCommentBox, setShowNewCommentBox] = useState(false);
  const [newComment, setNewComment] = useState("");
  const commentContainerRef = useRef(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);

  const handleComment = (e) => {
    e.preventDefault();
    if (editingCommentId) {
      handleUpdateComment(editingCommentId, updatedComments[editingCommentId]);
      setEditingCommentId(null);
    } else {
      dispatch(createComment({ comment, postId }));
      setComment("");
      setShouldScrollToBottom(true);
    }
  };

  const handleUpdateButtonClick = (commentId) => {
    setEditingCommentId(commentId);
    setUpdatedComments({ ...updatedComments, [commentId]: "" });
  };

  const handleUpdateComment = (commentId, updatedText) => {
    dispatch(updateComment({ postId, comment: updatedText, commentId }));
    setUpdatedComments({ ...updatedComments, [commentId]: "" });
    setEditingCommentId(null);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId, postId));
  };

  const handleCommentInputChange = (event) => {
    setComment(event.target.value);
  };

  const toggleCommentInput = () => {
    setShowCommentInput((prevState) => !prevState);
  };

  const toggleNewCommentBox = () => {
    setShowNewCommentBox((prevState) => !prevState);
    setNewComment(""); // Reset the new comment text area when toggling
  };

  const handleNewCommentInputChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleNewCommentSubmit = (e) => {
    e.preventDefault();
    dispatch(createComment({ comment: newComment, postId }));
    setNewComment("");
    setShouldScrollToBottom(true);
    toggleNewCommentBox();
  };

  useEffect(() => {
    if (shouldScrollToBottom) {
      commentContainerRef.current.scrollTop =
        commentContainerRef.current.scrollHeight;
      setShouldScrollToBottom(false);
    }
  }, [comments, shouldScrollToBottom]);

  console.log(comments)
  
  return (
    <div className="comment-box-out" ref={commentContainerRef}>
      {comments &&
        comments.map((comment) => (
          <div className="comment-box" key={comment._id}>
            <div className="photo-part">
              <div className="photo-part-img">
                <img
                  src={comment.author.profileImageUrl}
                  className="comment-pfp"
                  alt="Profile"
                />
              </div>
            </div>
            <div className="photo-part-name">
              <Link
                className="name-link"
                to={`/profile/${comment.author._id}`}
              >
                {comment.author.username}
              </Link>
            </div>

            <div className="comment-part">
              {editingCommentId === comment._id ? (
                <textarea
                  className={`text-input ${
                    editingCommentId === comment._id ? "input-extended" : ""
                  }`}
                  value={updatedComments[comment._id] || comment.text}
                  onChange={(e) =>
                    setUpdatedComments({
                      ...updatedComments,
                      [comment._id]: e.target.value,
                    })
                  }
                  ref={(el) => {
                    if (el) {
                      el.style.height = "auto";
                      el.style.height = `${el.scrollHeight}px`;
                    }
                  }}
                />
              ) : (
                <p>{comment.text}</p>
              )}
            </div>

            <div className="btn-part">
              {currentUser && currentUser._id === comment.author._id && (
                <div className="edit-delete-btn">
                  {!editingCommentId && (
                    <span
                      onClick={() => handleUpdateButtonClick(comment._id)}
                    >
                      <FontAwesomeIcon
                        icon={regularEdit}
                        style={{ color: "#0d0d0d" }}
                      />
                    </span>
                  )}
                  {editingCommentId === comment._id && (
                    <>
                      <button
                        onClick={() =>
                          handleUpdateComment(
                            comment._id,
                            updatedComments[comment._id]
                          )
                        }
                      >
                        Update
                      </button>
                    </>
                  )}
                  <button
                    className="delete-comment-btn"
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}

      {showNewCommentBox ? (
        <div className="comment-box">
          <div className="photo-part">
            <div className="photo-part-img">
              <img
                src={currentUser.profileImageUrl}
                className="comment-pfp"
                alt="Profile"
              />
            </div>
          </div>
          <div className="photo-part-name">
            <Link className="name-link" to={`/profile/${currentUser._id}`}>
              {currentUser.username}
            </Link>
          </div>

          <div className="comment-part">
            <textarea
              className="text-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleNewCommentInputChange}
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
            />
          </div>

          <div className="btn-part">
            <div className="edit-delete-btn">
              <button className="submit-change-btn" onClick={handleNewCommentSubmit}>
                Submit
              </button>
              <button className="submit-change-btn" onClick={toggleNewCommentBox}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cmt-btn">
  <span onClick={toggleNewCommentBox}>
    <FontAwesomeIcon
      className="cmnt-icon"
      icon={thinComment}
      style={{ color: "#0d0d0d", marginRight: '0.5rem' }}
    />
    <p>Add Comment</p>
  </span>
</div>

      )}
    </div>
  );
}

export default Comments;
