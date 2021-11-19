import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Form, Button, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import image from "../../assets/image2.jpg";
import ParticlesBg from "particles-bg";
import image2 from "../../assets/image1.jpg";
import AuthContext from "../../context/Auth/AuthContext";
import AlertContext from "../../context/Alert/AlertContext";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Login = ({ history, location }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [localLoading, setLocalLoading] = useState(false);
  const { authLoading, isAuthenticated, loginUser, message, error, userInfo } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  //   const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setAlert("Fields cannot be empty", "white", "red");
    } else {
      loginUser({ email, password });
    }
  };
  useEffect(() => {
    if (message === "login success") {
      history.push("/");
    }
    if (error === "Invalid email or password") {
      setAlert(error, "white", "red");
    }
    if (userInfo) history.push("/");

    //eslint-disable-next-line
  }, [message, error, userInfo]);
  return (
    <>
      <Backdrop className={classes.backdrop} open={authLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <ParticlesBg type="cobweb" bg={true} num={20} />
      <Card className="mt-3 register__card">
        <Row>
          <Col md={6}>
            <div
              className="form-container"
              style={{
                textAlign: "left",
                color: "black",
                padding: "5vw",
              }}
            >
              <h1>
                <strong>Welcome Back!</strong>
              </h1>
              <h5>Please login to your account</h5>
              <br />
              <Form onSubmit={onSubmit}>
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
                Don't have an account?&nbsp;
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                >
                  Register here
                </Link>
              </h5>
            </div>
          </Col>{" "}
          <Col md={6}>
            <img src={image} alt="farming" className="login__image" />
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Login;
