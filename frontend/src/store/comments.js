import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";
import { updatePost } from "./posts";


const RECEIVE_COMMENTS = "posts/RECEIVE_COMMENTS";
const RECEIVE_USER_COMMENTS = "posts/RECEIVE_USER_COMMENTS";
const RECEIVE_NEW_COMMENT = "posts/RECEIVE_NEW_COMMENT";
const RECEIVE_COMMENT_ERRORS = "posts/RECEIVE_COMMENT_ERRORS";
const CLEAR_COMMENT_ERRORS = "posts/CLEAR_COMMENT_ERRORS";
const RECEIVE_DELETED_COMMENT = "posts/RECEIVE_DELETED_COMMENT"

const receiveDeletedComment = (postId, deletedCommentId) => ({
    type: RECEIVE_DELETED_COMMENT,
    postId,
    deletedCommentId,
  });

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

    export const createComment = ({ comment, postId }) => async (dispatch, getState) => {
        
        try {
            const res = await jwtFetch(`/api/posts/${postId}/comments`, {
                method: "POST",
                body: JSON.stringify({ text: comment }),
                headers: {
                    "Content-Type": "application/json" // Correct the header field name
                }
            });
            const newComment = await res.json();
            dispatch(receiveNewComment(newComment));
    
            // Update the comments for the corresponding post
            const updatedPosts = [...getState().posts.all]; // Get the current posts from the Redux store
            const postIndex = updatedPosts.findIndex(post => post._id === postId);
            if (postIndex !== -1) {
                updatedPosts[postIndex].lastTwoComments.push(newComment); // Add the new comment to the lastTwoComments array
            }
            dispatch(updatePost(postId, updatedPosts[postIndex])); // Update the posts in the Redux store
    
        } catch (err) {
            const resBody = await err.json();
            if (resBody.statusCode === 400) {
                dispatch(receiveErrors(resBody.errors));
            }
        }
        
    }
    
    export const updateComment = ({ postId, comment, commentId }) => async (dispatch) => {
      try {
        const res = await jwtFetch(
          `/api/posts/${postId}/comments/${commentId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ text: comment }),
          }
        );
        const updatedComment = await res.json();
        dispatch(receiveNewComment(updatedComment));
    
        // Dispatch the updatePost action to update the post in the Redux store
        dispatch(updatePost(postId, updatedComment.post));
    
        return updatedComment;
      } catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          dispatch(receiveErrors(resBody.errors));
        }
      }
    };
    
    // ...
    

    export const deleteComment = (commentId, postId) => async (dispatch) => {
        try {
          const res = await jwtFetch(`/api/posts/${postId}/comments/${commentId}`, {
            method: "DELETE",
          });
          if (res.ok) {
            const deletedComment = await res.json();
      
            // Fetch the updated post data
            const postRes = await jwtFetch(`/api/posts/${postId}`);
            const updatedPost = await postRes.json();
      
            dispatch(receiveNewComment(deletedComment));
            dispatch(updatePost(postId, updatedPost));
          } else {
            // Handle non-2xx status codes
            throw new Error("Delete comment failed");
          }
        } catch (err) {
          console.error(err);
          dispatch(receiveErrors({ message: "Delete comment failed" }));
        }
      };
      
      
      

const initialState = {
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
