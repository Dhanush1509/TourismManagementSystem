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

const AuthReducer = (state, action) => {
  switch (action.type) {
    case CREATE_PACKAGE:
      return {
        ...state,
        tourPackage: action.payload.savedPackage,
        packageMessage: action.payload.message,
      };
    case START_PACKAGE_LOADING:
      return { ...state, packageLoading: true };
    case STOP_PACKAGE_LOADING:
      return { ...state, packageLoading: false };
    case GET_PACKAGE:
      return { ...state, tourPackage: action.payload.package };
    default:
      return state;
  }
};
export default AuthReducer;
