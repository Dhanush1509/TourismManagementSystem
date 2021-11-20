import React, { useReducer } from "react";
import AuthContext from "./AuthContext.js";
import AuthReducer from "./AuthReducer.js";
import setAuth from "../../utils/setAuthToken.js"
import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  START_LOADING,
  STOP_LOADING,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  OTHER_USER_DETAILS,
  CLEAR_OTHER_USER_DETAILS,
  LOGOUT_USER,
  UPDATE_USER,
} from "../types.js";
import axios from "axios";

import { toast } from "react-toastify";
const userInfoInStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  :null;
const AuthState = (props) => {
  const initialState = {
    userInfo: userInfoInStorage,
    isAuthenticated: false,
    authLoading: false,
    error: null,
    message: null,
    otherUserDetails: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const updateUser = async (formData) => {
    if (state.userData.token) {
      setAuth(state.userData.token);
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put("/users/profile", formData, config);
      dispatch({ type: UPDATE_USER, payload: data });
      getUserInfoOfOthers ();
    } catch (err) {
      dispatch({ type: LOGIN_USER_ERROR, payload: err.response.data.message });
    }
  };
  const loginUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axios.post("/api/users/login", formData, config);
      dispatch({ type: LOGIN_USER, payload: data });
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CLEAR_MESSAGE });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
  };
  const registerUser = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axios.post(
        "/api/users/register",
        formData,
        config
      );
      // console.log(data);
      dispatch({ type: REGISTER_USER, payload: data });
      dispatch({ type: STOP_LOADING });
      dispatch({ type: CLEAR_MESSAGE });
    } catch (err) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
  };
  const getUserInfoOfOthers = async (id) => {
    console.log(id);
    try {
      dispatch({ type: START_LOADING });
      const { data } = await axios.get(`/api/users/profile`);
      dispatch({ type: OTHER_USER_DETAILS, payload: data });
      dispatch({ type: STOP_LOADING });
      // dispatch({ type: CLEAR_MESSAGE });
      // dispatch({ type: CLEAR_OTHER_USER_DETAILS });
    } catch (err) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
  };
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
  };
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        getUserInfoOfOthers,
        isAuthenticated: state.isAuthenticated,
        authLoading: state.authLoading,
        error: state.error,
        message: state.message,
        userInfo: state.userInfo,
        otherUserDetails: state.otherUserDetails,
        logoutUser,
        updateUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthState;
