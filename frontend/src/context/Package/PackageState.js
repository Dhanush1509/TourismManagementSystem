import { useContext, useReducer } from "react";
import PackageContext from "./PackageContext.js";
import PackageReducer from "./PackageReducer.js";
import AuthContext from "../Auth/AuthContext.js";
import setAuthToken from "../../utils/setAuthToken";

import axios from "axios";
import {
  START_PACKAGE_LOADING,
  CLEAR_MESSAGE,
  CLEAR_ERROR,
  STOP_PACKAGE_LOADING,
  CREATE_PACKAGE_ERROR,
  CREATE_PACKAGE,
  DELETE_PACKAGE,
  GET_PACKAGE,
  GET_PACKAGES,
  EDIT_PACKAGE,
} from "../types.js";
const PackageState = ({ children }) => {
  const { userInfo } = useContext(AuthContext);
  const initialState = {
    packageLoading: false,
    tourPackage: null,
    packageMessage: null,
  };
  const [state, dispatch] = useReducer(PackageReducer, initialState);
  const createPackage = async (formData) => {
    setAuthToken(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: START_PACKAGE_LOADING });
      const { data } = await axios.post(
        "/api/packages/createpackage",
        formData,
        config
      );
      dispatch({ type: CREATE_PACKAGE, payload: data });

      dispatch({ type: CLEAR_MESSAGE });
    } catch (err) {
      dispatch({
        type: CREATE_PACKAGE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
    dispatch({ type: STOP_PACKAGE_LOADING });
  };
  const deletePackage = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: START_PACKAGE_LOADING });
      const { data } = await axios.delete(
        "/api/packages/delete/:id",
        formData,
        config
      );
      dispatch({ type: DELETE_PACKAGE, payload: data });

      dispatch({ type: CLEAR_MESSAGE });
    } catch (err) {
      dispatch({
        type: CREATE_PACKAGE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
    dispatch({ type: STOP_PACKAGE_LOADING });
  };
  const getPackage = async (packageid) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      dispatch({ type: START_PACKAGE_LOADING });
      const { data } = await axios.get(`/api/packages/${packageid}`, config);
      dispatch({ type: GET_PACKAGE, payload: data });

      dispatch({ type: CLEAR_MESSAGE });
    } catch (err) {
      dispatch({
        type: CREATE_PACKAGE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
      dispatch({ type: CLEAR_ERROR });
    }
    dispatch({ type: STOP_PACKAGE_LOADING });
  };
  return (
    <PackageContext.Provider
      value={{
        createPackage,
        packageLoading: state.packageLoading,
        tourPackage: state.tourPackage,
        getPackage,
        packageMessage: state.packageMessage,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};
export default PackageState;
