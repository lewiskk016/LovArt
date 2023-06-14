import "./Comments.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createComment,
  updateComment,
  deleteComment,
} from "../../store/comments";
import { updatePost } from "../../store/posts";
import { getCurrentUser } from "../../store/session";
import { useState } from "react";

function Comments({ postId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const post = useSelector((state) =>
    state.posts.all.find((post) => post._id === postId)
  );
  const currentUser = useSelector((state) => state.session.user);
  const comments = post ? post.lastTwoComments : [];

  const [updatedComments, setUpdatedComments] = useState({});

  const handleComment = (e) => {
    e.preventDefault();
    dispatch(createComment({ comment, postId }));
    setComment("");
  };

  const handleUpdateComment = (commentId, updatedText) => {
    dispatch(updateComment({ postId, comment: updatedText, commentId }));
    setUpdatedComments({ ...updatedComments, [commentId]: "" });
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId, postId));
  };

  return (
    <div className="comment-index-container">
      <div className="comment-page-container">
        {comments &&
          comments.map((comment) => (
            <div className="comment-box" key={comment._id}>
              <div className="comment-box-username">{comment.author}</div>
              <div className="comment-box-comment">{comment.text}</div>
              {currentUser && currentUser._id === comment.authorId && (
                <div>
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
                      )
                    }
                  >
                    Update
                  </button>
                  <button onClick={() => handleDeleteComment(comment._id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className="half-page"></div>
      <div className="comment-form-container">
        <form className="comment-form" onSubmit={handleComment}>
          <textarea
            className="comment-form-input"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="comment-form-button" type="submit">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Comments;
