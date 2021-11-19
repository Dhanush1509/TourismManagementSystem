import React, { useContext } from "react";
import alertContext from "../../context/Alert/AlertContext";
import { Alert } from "react-bootstrap";
// import ReactJsAlert from "reactjs-alert";

function Alerts() {
  const AlertContext = useContext(alertContext);
  const { alerts } = AlertContext;
  return alerts.map((alert, index) => (
    <center>
      <Alert
        className="mt-1"
        style={{
          color: alert.color,
          backgroundColor: alert.bgColor,
          fontSize: "16px",
          marginLeft: "5vw",
          marginRight: "5vw",
          fontWeight: "600",
        }}
      >
        {alert.msg}
      </Alert>
    </center>
  ));
}

export default Alerts;
