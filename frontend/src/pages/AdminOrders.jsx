import React, { useState, useContext, useEffect } from "react";
import OrderContext from "../context/Order/OrderContext";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  ListGroup,
  Form,
  Button,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import moment from "moment";
import AuthContext from "../context/Auth/AuthContext";
const AdminOrders = ({ history }) => {
  const { getAllOrdersForAdmin, myorders, adminOrders, updateOrderToVerified } =
    useContext(OrderContext);
  const { userInfo } = useContext(AuthContext);
  useEffect(() => {
    if (userInfo.isAdmin) getAllOrdersForAdmin();
    else history.push("/");
  }, []);
  const update = (id) => {
    updateOrderToVerified(id);
    Swal.fire("Verified Successful", "Done!", "success").then((result1) => {
      window.location.reload();
    });
  };
  return (
    <div style={{ margin: "60px 5vw" }}>
      <h1>Your Packages</h1>
      <ListGroup>
        {adminOrders &&
          adminOrders.map((c, index) => (
            <ListGroup.Item key={index}>
              <Link
                to={`/tickets/${c._id}/ticket/download`}
                style={{ color: "black" }}
              >
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
                        {c.permanentAddress.city},{c.permanentAddress.country}-
                        {c.permanentAddress.postalCode}
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
                        <ListGroup.Item>
                          Name: {c.packageInfo.pName}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Location: {c.packageInfo.pLocation}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          Start Date:{" "}
                          {moment(c.packageInfo.pStart).format(
                            "MMMM Do YYYY, h:mm:ss"
                          )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                          End Date:{" "}
                          {moment(c.packageInfo.pEnd).format(
                            "MMMM Do YYYY, h:mm:ss"
                          )}
                        </ListGroup.Item>
                        <ListGroup.Item>VERIFICATION ID: {c.ID}</ListGroup.Item>
                        <ListGroup.Item>
                          Travellers Count: {c.adultsCount}
                        </ListGroup.Item>
                        {c.isPaid && (
                          <ListGroup.Item>
                            Paid At:{" "}
                            {moment(c.paidAt).format("MMMM Do YYYY, h:mm:ss")}
                          </ListGroup.Item>
                        )}
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
                          {c.isPaid ? "Paid" : "Not Paid"}
                        </Button>
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Col md={12}>
                        <Button
                          type="button"
                          className="btn-block"
                          variant="info"
                        >
                          {c.isPaid ||
                          new Date(c.pEnd).getTime() > new Date().getTime() ||
                          new Date().getTime() > new Date(c.pStart).getTime()
                            ? "Expired"
                            : "Pay Here"}
                        </Button>
                      </Col>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Col md={12}>
                        <Button
                          type="button"
                          className="btn-block"
                          variant="warning"
                          disabled={!c.isPaid||c.isVerified}
                          onClick={() => update(c._id)}
                        >
                          {c.isVerified ? "Verified" : "Verify"}
                        </Button>
                      </Col>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>

              <ListGroup.Item>Travellers Details</ListGroup.Item>

              <ListGroup>
                {c.travellerDetails &&
                  c.travellerDetails.length > 0 &&
                  c.travellerDetails.map((c) => (
                    <ListGroup.Item>
                      {c.name}, {c.age}, {c.idNo}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
};

export default AdminOrders;
