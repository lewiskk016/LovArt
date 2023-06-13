import './Comments.css'

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchComments, createComment, deleteComment } from "../../store/comments";
import { clearPostErrors } from "../../store/posts";
import { fetchPosts } from "../../store/posts";
import { getCurrentUser } from "../../store/session";


function Comments({postId}) {
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [editComment, setEditComment] = useState("");
    const [editCommentId, setEditCommentId] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState("");

    const comments = useSelector((state) => Object.values(state.comments.all));
    const currentUser = useSelector((state) => state.session.user);
    const users = useSelector((state) => state.users);
    const handleComment = (e) => {
        e.preventDefault();
        dispatch(createComment({comment, postId}));
        setComment("");
    }

    const handleEdit = (e) => {
        e.preventDefault();
        dispatch(createComment(postId, editComment));
        setEditComment("");
        setShowEdit(false);
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteComment(deleteCommentId));
        setShowDelete(false);
    }

    // useEffect(() => {
    //     dispatch(fetchComments(postId));
    //     dispatch(fetchPosts());
    //     return () => {
    //       dispatch(clearPostErrors());
    //     };
    //   }, [dispatch, postId]);


    return (
        <>
            <div className="comment-index-container">
                <div className="comment-page-container">
                    {comments.map((comment) => (
                        <>
                            <div className="comment-box">
                                <div className="comment-box-username">

                                    {users[comment.user_id].username}
                                </div>
                                <div className="comment-box-comment">
                                    {comment.comment}
                                </div>
                                <div className="comment-box-buttons">
                                    {currentUser.id === comment.user_id && (
                                        <>
                                            <button className="comment-box-edit" onClick={() => {
                                                setShowEdit(true);
                                                setEditComment(comment.comment);
                                                setEditCommentId(comment._id);
                                            }}>Edit</button>
                                            <button className="comment-box-delete" onClick={() => {
                                                setShowDelete(true);
                                                setDeleteCommentId(comment._id);
                                            }}>Delete</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
                <div className="half-page"></div>
            </div>
            <div className="comment-form-container">
                <form className="comment-form" onSubmit={handleComment}>
                    <textarea
                        className="comment-form-input"
                        placeholder="Add a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className="comment-form-button" type="submit">Post</button>
                </form>
            </div>
            {showEdit && (
                <div className="edit-comment-container">
                    <form className="edit-comment-form" onSubmit={handleEdit}>
                        <textarea

                            className="edit-comment-form-input"
                            value={editComment}
                            onChange={(e) => setEditComment(e.target.value)}
                        />
                        <button className="edit-comment-form-button" type="submit">Edit</button>
                    </form>
                </div>
            )}
            {showDelete && (
                <div className="delete-comment-container">
                    <form className="delete-comment-form" onSubmit={handleDelete}>
                        <button className="delete-comment-form-button" type="submit">Delete</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Comments;
