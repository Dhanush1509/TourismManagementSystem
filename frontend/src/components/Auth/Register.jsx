import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryList from "./CountryList";
import image from "../../assets/image1.jpg";
import image2 from "../../assets/image2.jpg";
import ParticlesBg from "particles-bg";
import AuthContext from "../../context/Auth/AuthContext";
import AlertContext from "../../context/Alert/AlertContext";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Register = ({ history, location }) => {
  const classes = useStyles();
  const {
    authLoading,
    isAuthenticated,
    registerUser,
    message,
    error,
    userInfo,
  } = useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("Select Country");
  const [role, setRole] = useState("Select Role");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  //   const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (message && message.substring(0, 20) === "A verification email") {
      history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "white", "red");
    }
    if (userInfo) history.push("/");

    //eslint-disable-next-line
  }, [message, error, userInfo]);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || password === "" || password2 === "" || email === "") {
      setAlert("Fields cannot be empty", "white", "red");
    } else if (password2 !== password) {
      setAlert("Passwords did not match", "white", "red");
    } else {
      registerUser({ name, email, password });
    }
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={authLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ParticlesBg type="cobweb" bg={true} num={20} />
      <Card className="mt-3 register__card">
        <Row>
          <Col md={6}>
            <img src={image} alt="farming" className="register__image" />
          </Col>
          <Col md={6}>
            <div
              className="form-container"
              style={{
                textAlign: "left",
                color: "black",
                padding: "5vw",
              }}
            >
              <center>
                <h2 style={{ color: "black" }} className="mb-3">
                  Sign Up
                </h2>
              </center>
              <Form onSubmit={onSubmit}>
                <Form.Group controlId="formGroupName">
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    maxLength="30"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formGroupPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    minLength="6"
                  />
                </Form.Group>
                <Form.Group controlId="formGroupPassword1">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                    minLength="6"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
              <h5
                style={{
                  textAlign: "left",
                  color: "black",
                }}
                className="mt-3"
              >
                Have an account?&nbsp;
                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                  Login here
                </Link>
              </h5>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Register;
