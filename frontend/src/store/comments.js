import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";


const RECEIVE_COMMENTS = "posts/RECEIVE_COMMENTS";
const RECEIVE_USER_COMMENTS = "posts/RECEIVE_USER_COMMENTS";
const RECEIVE_NEW_COMMENT = "posts/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "posts/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "posts/CLEAR_COMMENT_ERRORS";

const receiveComments = (comments) => ({
    type: RECEIVE_COMMENTS,
    comments,
});

const receiveUserComments = (comments) => ({
    type: RECEIVE_USER_COMMENTS,
    comments,
});

const receiveNewComment = (comment) => ({
    type: RECEIVE_NEW_COMMENT,
    comment,
});

const receiveErrors = (errors) => ({
    type: RECEIVE_COMMENT_ERRORS,
    errors,
});

export const clearCommentErrors = (errors) => ({
    type: CLEAR_COMMENT_ERRORS,
    errors,
});

export const fetchComments = (postId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/${postId}/comments`);
        const comments = await res.json();
        dispatch(receiveComments(comments));
      } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          dispatch(receiveErrors(resBody.errors));
        }
      }
    };

export const fetchUserComments = (id) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/postId/comments/user/${id}`);
        const comments = await res.json();
        dispatch(receiveUserComments(comments));
      } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
      }
    }

export const createComment = ({comment, postId}) => async (dispatch) => {
    // debugger
    // console.log(comment)
    // console.log(postId)
    // debugger
    try {
        const res = await jwtFetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            body: JSON.stringify({text: comment}),
            headers: {
            ContentType: "application/json"
            }
        });
        const newComment = await res.json();
        console.log(newComment)
        dispatch(receiveNewComment(newComment));
        // return newComment;
    } catch (err) {
        console.log(err);
        const resBody = await err.json();
        console.log(resBody);
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const updateComment = (comment) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/postId/comments/${comment._id}`, {
            method: "PUT",
            body: JSON.stringify(comment),
        });
        const newComment = await res.json();
        dispatch(receiveNewComment(newComment));
        return newComment;
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    try {
        const res = await jwtFetch(`/api/posts/postId/comments/${commentId}`, {
            method: "DELETE",
        });
        const deletedComment = await res.json();
        dispatch(receiveNewComment(deletedComment));
        return deletedComment;
    } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
            dispatch(receiveErrors(resBody.errors));
        }
    }
}

const initialState = {
    all: {},
    user: {},
    new: undefined,
    errors: [],
};

const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_COMMENTS:
            return {
                ...state,
                all: action.comments,
            };
        case RECEIVE_USER_COMMENTS:
            return {
                ...state,
                user: action.comments,
            };
        case RECEIVE_NEW_COMMENT:
            return {
                ...state,
                new: action.comment,
            };
        case RECEIVE_COMMENT_ERRORS:
            return {
                ...state,
                errors: action.errors,
            };
        case CLEAR_COMMENT_ERRORS:
            return {
                ...state,
                errors: [],
            };
        case RECEIVE_USER_LOGOUT:
            return initialState;
        default:
            return state;
    }
}

export default commentsReducer;
