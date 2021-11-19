import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, CLEAR_ALERT } from "../types";
import { v4 as uuidv4 } from "uuid";
function AlertState(props) {
  const initialState = [];
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, color, bgColor, timeOut = 6000) => {
    const id = uuidv4();
    dispatch({ type: SET_ALERT, payload: { id, msg, color, bgColor } });
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT, payload: id });
    }, timeOut);
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
}

export default AlertState;
