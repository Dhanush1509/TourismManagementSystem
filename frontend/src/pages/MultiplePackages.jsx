import React, { useEffect, useState, useContext } from "react";
import AlertContext from "../context/Alert/AlertContext";
import axios from "axios";
import { Button, Row, Col, Container } from "react-bootstrap";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const MultiplePackages = ({ history }) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  const [packages, setPackages] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    const getAllPackages = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        setLoading(true);
        const { data } = await axios.get("/api/packages/getPackages", config);
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setAlert(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
          "white",
          "red"
        );
      }
    };
    getAllPackages();
  }, []);
  return (
    <div style={{ margin: "2vh 5vw", overflow: "auto", fontSize: "16px" }}>
       <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {packages &&
        packages.length > 0 &&
        packages.map((c, index) => (
          <div
            style={{
              borderRadius: "12px",
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              margin: "30px 0",
              padding: "20px 15px",
            }}
            className="packageCard"
          >
            <img
              src={c.pImage}
              alt={c.pName}
              style={{ borderRadius: "12px", width: "100%", height: "auto" }}
            />

            <div className="packageContent">
              <h1>{c.pName}</h1>
              <p>{c.pDescription.substring(0,500)}{" "} <span style={{cursor:"pointer"}} variant="info" onClick={() => history.push(`packages/${c._id}`)}><b>Read More...</b></span></p>
              <Button
               variant="success"
                className="mr-5"
              >
              {`Price  Rs.${c.pPrice}/head`}
              </Button>
              {/* <Button
               variant="info"
                className="mr-5"
              >
              {`${c.pAvailable} Tickets Available`}
              </Button> */}
              <Button
                variant="primary"
                onClick={() => history.push(`packages/${c._id}`)}
              >
                View Package
              </Button>
            </div>
            <div> </div>
          </div>
        ))}
    </div>
  );
};

export default MultiplePackages;
