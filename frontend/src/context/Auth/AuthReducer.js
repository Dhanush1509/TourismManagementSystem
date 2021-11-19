import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  START_LOADING,
  STOP_LOADING,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  OTHER_USER_DETAILS,
  CLEAR_OTHER_USER_DETAILS,
  LOGOUT_USER,
} from "../types.js";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      console.log(action.payload);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userData));
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload.userData,
        message: action.payload.message,
        error: null,
      };
    case REGISTER_USER:
      console.log(action);
      localStorage.setItem("userInfo", JSON.stringify(action.payload.userData));
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload.userData,
        message: action.payload.message,
        error: null,
      };
    case REGISTER_USER_ERROR:
    case LOGIN_USER_ERROR:
      return {
        ...state,
        error: action.payload,
        authLoading: false,
      };
    case OTHER_USER_DETAILS:
      return {
        ...state,
        otherUserDetails: action.payload.user,
        message: action.payload.message,
      };
    case START_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case STOP_LOADING:
      return {
        ...state,
        authLoading: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };
    case CLEAR_OTHER_USER_DETAILS:
      return {
        ...state,
        otherUserDetails: null,
      };
    case LOGOUT_USER:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
};
export default AuthReducer;
