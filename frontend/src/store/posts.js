import jwtFetch from "./jwt";
import { RECEIVE_USER_LOGOUT } from "./session";
import { RECEIVE_DELETED_COMMENT } from './comments';

const RECEIVE_POSTS = "posts/RECEIVE_POSTS";
const RECEIVE_USER_POSTS = "posts/RECEIVE_USER_POSTS";
const RECEIVE_NEW_POST = "posts/RECEIVE_NEW_POST";
const RECEIVE_POST_ERRORS = "posts/RECEIVE_POST_ERRORS";
const CLEAR_POST_ERRORS = "posts/CLEAR_POST_ERRORS";
const DELETE_POST = 'posts/DELETE_POST'
const UPDATE_POST = 'posts/UPDATE_POST';
const LIKE_POST = 'posts/:postId/LIKE_POST';
const UNLIKE_POST = 'posts/:postId/UNLIKE_POST';
const RECEIVE_POST = "posts/RECEIVE_POST";
const RECEIVE_COMMENTS = "posts/RECEIVE_COMMENTS";

const receiveComments = (comments) => ({
  type: RECEIVE_COMMENTS,
  comments,
});

export const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
});

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts,
});

const receiveUserPosts = (posts) => ({
  type: RECEIVE_USER_POSTS,
  posts,
});

const receiveNewPost = (post) => ({
  type: RECEIVE_NEW_POST,
  post,
});

export const deletePost = postId => ({
  type: DELETE_POST,
  postId
});

export const receiveErrors = (errors) => ({
      type: RECEIVE_POST_ERRORS,
      errors
})

export const clearPostErrors = (errors) => ({
  type: CLEAR_POST_ERRORS,
  errors,
});

const likePost = (postId, currentUserId) => ({
  type: LIKE_POST,
  postId,
  currentUserId,

});

const unlikePost = (postId, currentUserId) => ({
  type: UNLIKE_POST,
  postId,
  currentUserId,
});

export const fetchPost = (postId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}`);
    const post = await res.json();
    dispatch(receivePost(post));
    dispatch(receiveComments(post.lastTwoComments));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const res = await jwtFetch("/api/posts");
    const posts = await res.json();
    dispatch(receivePosts(posts));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const fetchUserPosts = (id) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/user/${id}`);
    const posts = await res.json();
    dispatch(receiveUserPosts(posts));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const composePost = (text, images) => async (dispatch) => {
  const formData = new FormData();
  formData.append("text", text);
  Array.from(images).forEach(image => formData.append("images", image));
  try {
    const res = await jwtFetch("/api/posts/", {
      method: "POST",
      body: formData
    });
    const post = await res.json();
    dispatch(receiveNewPost(post));
    return Promise.resolve(); // If everything is successful, resolve the Promise
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
    return Promise.reject(); // If an error occurred, reject the Promise
  }
};

export const deleteUserPosts = (postId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}`, {
      method: "DELETE"
    });
    dispatch(deletePost(postId));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
}

export const updatePost = (postId, text) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const updatedPost = await res.json();
    dispatch({
      type: UPDATE_POST,
      payload: updatedPost,
    });
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      return dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const likePostAction = (postId, currentUserId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId }),
    });

    const likedPost = await res.json();
    dispatch(likePost(likedPost._id, currentUserId));
  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

export const unlikePostAction = (postId, currentUserId) => async (dispatch) => {
  try {
    const res = await jwtFetch(`/api/posts/${postId}/unlike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: currentUserId }),
    });
    const unlikedPost = await res.json();
    dispatch(unlikePost(unlikedPost._id, currentUserId));

  } catch (err) {
    const resBody = await err.json();
    if (resBody.statusCode === 400) {
      dispatch(receiveErrors(resBody.errors));
    }
  }
};

const nullErrors = null;

export const postErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_POST_ERRORS:
      return action.errors;
    case RECEIVE_NEW_POST:
    case CLEAR_POST_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const postsReducer = (state = { all: {}, user: {}, new: undefined, comments: [] }, action) => {

  switch (action.type) {
    case RECEIVE_POSTS:
      return { ...state, all: action.posts, new: undefined };
    case RECEIVE_USER_POSTS:
      return { ...state, user: action.posts, new: undefined };
    case RECEIVE_NEW_POST:
      return { ...state, new: action.post };
    case RECEIVE_USER_LOGOUT:
      return { ...state, user: {}, new: undefined };
    case DELETE_POST:
      return {
        ...state,
        all: state.all.filter(post => post._id !== action.postId),
      };
    case UPDATE_POST:
      const { payload: updatedPost } = action;
      return {
        ...state,
        all: state.all.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        ),
      };
    case RECEIVE_COMMENTS:
      return {
        ...state,
        all: state.all.map((post) =>
          post._id === action.postId ? { ...post, lastTwoComments: action.comments } : post
        ),
      };
    case LIKE_POST:
      return {
        ...state,
        all: state.all.map((post) => {
          if (post._id === action.postId) {
            return {
              ...post,
              likes: [...post.likes, action.currentUserId],
            };
          }
          return post;
        }),
      };
    case UNLIKE_POST:
      return {
        ...state,
        all: state.all.map((post) => {
          if (post._id === action.postId) {
            return {
              ...post,
              likes: post.likes.filter((like) => like !== action.currentUserId),
            };
          }
          return post;
        }),
      };
      case RECEIVE_DELETED_COMMENT:
  return {
    ...state,
    all: state.all.map(post => post._id === action.postId 
      ? { ...post, lastTwoComments: post.lastTwoComments.filter(comment => comment._id !== action.deletedCommentId) } 
      : post)
  };

    default:
      return state;
  }
};

export default postsReducer;
