import { SET_ALERT, CLEAR_ALERT } from "../types";

const AlertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];

    case CLEAR_ALERT:
      return state.filter((state) => state.id !== action.payload);
    default:
      return state;
  }
};
export default AlertReducer;
