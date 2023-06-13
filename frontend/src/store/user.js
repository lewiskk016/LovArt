import jwtFetch from "./jwt"

const RECEIVE_USER = "user/RECEIVE_USER"
const RECEIVE_USER_ERRORS = "user/RECEIVE_USER_ERRORS";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveErrors = (errors) => ({
    type: RECEIVE_USER_ERRORS,
    errors,
  });
  

export const fetchUserObject = (id) => async (dispatch) => {
    try {
    const res = await jwtFetch(`/api/posts/user/${id}`)
    const user = await res.json()
    dispatch(receiveUser(user))
    }catch (err) {
        const resBody = await err.json();
        if (resBody.statusCode === 400) {
          return dispatch(receiveErrors(resBody.errors));
        }
      }
}

const userReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            
            return{...state, user: action.user};  
        default:
            return state;
    }
}

export default userReducer