import React, { useState, useContext, useEffect } from "react";
import OrderContext from "../context/Order/OrderContext";
import AuthContext from "../context/Auth/AuthContext";
import AlertContext from "../context/Alert/AlertContext";
import { Link } from "react-router-dom";
import image1 from "../assets/image1.jpg"



import farmer from "../assets/1.png";
import {
  Row, 
  Col,
  Container,
  ListGroup,
  Form,
  Button,
  Image,
} from "react-bootstrap";
import moment from "moment";
const UserPackages = ({ history }) => {
  const { getMyOrders, myorders } = useContext(OrderContext);
  const { getUserInfoOfOthers, userInfo, logoutUser, error, updateUser } =
    useContext(AuthContext);
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {
    if (userInfo) {
      getMyOrders();
      getUserInfoOfOthers(userInfo._id);
    }
  }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  let email1;
  if (userInfo) {
    email1 = userInfo.email;
  }
  const { name, email, password, password2 } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  useEffect(() => {
    if (error === "User already exists") {
      if (email1 !== email) {
        setAlert(error, "white", "red");
      }
      // clearErrors();
    }
    //eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    if (!userInfo) {
      history.push("/signin");
    } else {
      if (!user) {
        getUserInfoOfOthers();
      } else {
        setUser({
          name: userInfo.name,
          email: userInfo.email,
          password: "",
          password2: "",
        });
      }
    }
    //eslint-disable-next-line
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords did not match", "white", "red");
    } else {
      updateUser({
        name,
        email,
        password,
      });
    }
  };
  return userInfo ? (
    <div style={{ margin: "2vh 5vw" }}>

      <h1 style={{ margin: "30px 0" }}> Hello {userInfo.name}</h1>
    <div className="divInProfile">
      <div className="cardInProfile m-5">
        <div className="banner">
          <div className="svgimage">
            <img src={farmer} alt="farmersvg" />
          </div>
        </div>

        <h2 className="name" style={{ marginTop: "75px" }}>
          {userInfo.name}
        </h2>
        <div className="title">{userInfo.role}</div>
    
        <div className="desc" style={{textAlign:"center"}}>
    Loves Travelling❤
        </div>
      </div>
    </div>
      <div
        class="form-container"
        style={{ textAlign: "left", color: "black", margin: "none" }}
      >
        <h2 style={{ color: "black" }}>Edit profile</h2>

        <Form onSubmit={onSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              maxLength="30"
            />
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword1">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
              minLength="6"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Edit Profile
          </Button>
        </Form>
      </div>

      <div style={{ marginTop: "60px" }}>
        <h1>Your Packages</h1>
        <ListGroup>
          {myorders &&
            myorders.map((c, index) => (
              <ListGroup.Item key={index}>
                 <Link to={`/tickets/${c._id}/ticket/download`} style={{ color: "black" }}>
                  <h3 style={{ padding: "10px 5px" }}>{c._id}</h3>
                </Link>
                <Row>
                  <Col md={8}>
                    <ListGroup style={{ color: "black" }}>
                      <ListGroup.Item>
                        <ListGroup.Item>

                          <h2> Address </h2>
                        </ListGroup.Item>

                        <p className="mt-3">
                          <span>Address:</span> {c.permanentAddress.address},
                          {c.permanentAddress.city},{c.permanentAddress.country}
                          -{c.permanentAddress.postalCode}
                        </p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <ListGroup.Item>
                          {" "}
                          <h2>Payment Option</h2>
                        </ListGroup.Item>
                        <p className="mt-3">Razorpay</p>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <ListGroup>
                          <ListGroup.Item>Name: {c.packageInfo.pName}</ListGroup.Item>
                          <ListGroup.Item>Location: {c.packageInfo.pLocation}</ListGroup.Item>
                          <ListGroup.Item>Start Date: {moment(c.packageInfo.pStart).format("MMMM Do YYYY, h:mm:ss")}</ListGroup.Item>
                          <ListGroup.Item>End Date: {moment(c.packageInfo.pEnd).format("MMMM Do YYYY, h:mm:ss")}</ListGroup.Item>
                          <ListGroup.Item>Travellers Count: {c.adultsCount}</ListGroup.Item>
                          {c.isPaid&& <ListGroup.Item>Paid At: {moment(c.paidAt).format("MMMM Do YYYY, h:mm:ss")}</ListGroup.Item>}
                        </ListGroup>
                      </ListGroup.Item>
                    </ListGroup>
                  </Col>
                  <Col md={4}>
                    <ListGroup style={{ color: "black" }}>
                      <ListGroup.Item>
                        <Col md={12}>
                          <ListGroup.Item>
                            <h2>Order Summary</h2>
                          </ListGroup.Item>
                        </Col>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                    
                          <Col md={6}>Total Cost</Col>
                          <Col md={6}>
                            ₹
                            {Math.floor(
                              Number(c.packageInfo.pPrice) *
                                (Number(c.adultsCount) +
                                  Number(c.infantsCount) / 2)
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          {" "}
                          <Col md={6}>Tax Charge</Col>
                          <Col md={6}>
                            ₹
                            {Math.floor(
                              (Number(c.packageInfo.pPrice) *
                                (Number(c.adultsCount) +
                                  Number(c.infantsCount) / 2)) /
                                100
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          {" "}
                          <Col md={6}>Total</Col>
                          <Col md={6}>
                            ₹
                            {Math.floor(
                              (Number(c.packageInfo.pPrice) *
                                (Number(c.adultsCount) +
                                  Number(c.infantsCount) / 2)) /
                                100
                            ) +
                              Math.floor(
                                Number(c.packageInfo.pPrice) *
                                  (Number(c.adultsCount) +
                                    Number(c.infantsCount) / 2)
                              )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Col md={12}>
                          <Button type="button" className="btn-block">
                            {c.isPaid ? "Paid": "Not Paid" }
                          </Button>
                        </Col>
                      </ListGroup.Item>
                      {/* <ListGroup.Item>
                        <Col md={12}>
                          <Button
                            type="button"
                            className="btn-block"
                            variant="info"
                          >
                            {c.isPaid||new Date(c.pEnd).getTime() >
                              new Date().getTime() ||
                            new Date().getTime() > new Date(c.pStart).getTime()
                              ? "Expired"
                              : "Pay Here"}
                          </Button>
                        </Col>
                      </ListGroup.Item> */}
                    </ListGroup>

                  </Col>
              
                  <Col> 
                  <ListGroup.Item><h3>Travellers Details</h3></ListGroup.Item>
                  <ListGroup>
                    {c.travellerDetails&&c.travellerDetails.length>0&&c.travellerDetails.map(c=>     <ListGroup.Item>{c.name}, {c.age}, {c.idNo}</ListGroup.Item>)}
               
                </ListGroup></Col>
                 
                </Row>
              </ListGroup.Item>
            ))}
        </ListGroup>
        
      </div>
    </div>
  ) : (
    <h1>Loading......</h1>
  );
};

export default UserPackages;
