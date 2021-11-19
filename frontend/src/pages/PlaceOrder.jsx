import React, { useContext, useEffect, useState } from "react";
import { Row, Col, ListGroup, Container, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import orderContext from "../context/Order/OrderContext";
import authContext from "../context/Auth/AuthContext";
import AlertContext from "../context/Alert/AlertContext";
import Checkout from "./Checkout";
import axios from "axios";
import setAuth from "../utils/setAuthToken";
import dotenv from "dotenv";
import Swal from "sweetalert2";
dotenv.config();

const PlaceOrder = ({history}) => {
  //   const { addOrder, orderDetails, order, success, resetAddOrder } = useContext(
  //     orderContext
  //   );
  // const {addOrder}=useContext(orderContext)
  const { userInfo } = useContext(authContext);
  const { setAlert } = useContext(AlertContext);
  const [packageD, setPackageD] = useState(null);
  const [packageDetails, setPackageDetails] = useState(null);
  const [paymentOption, setPaymentOption] = useState("Razorpay");
  const [razorpayLoading, setRazorpayLoading] = useState(false);
  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        setRazorpayLoading((prev) => !prev);
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    setRazorpayLoading(true)
    setRazorpayLoading((prev) => !prev);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setAuth(userInfo.token);
    const result = await axios.post("/orders/razorpay/generateid", {
      infantsCount: 0,
      travellerDetails:packageD.travellerDetails,
      adultsCount: packageD.adultsCount,
      packageInfo:packageDetails._id,
      permanentAddress: {
        address: packageD.address,
        country: packageD.country,
        postalCode: packageD.postalCode,
        city: packageD.city,
      },
      paymentOption: "Razorpay",
      taxPrice: Math.floor(
        (Number(packageDetails.pPrice) *
          (Number(packageD.adultsCount) + Number(packageD.infantsCount) / 2)) /
          100
      ),
      packagePrice: Math.floor(
        Number(packageDetails.pPrice) *
          (Number(packageD.adultsCount) + Number(packageD.infantsCount) / 2)
      ),
      totalPrice:
        Math.floor(
          (Number(packageDetails.pPrice) *
            (Number(packageD.adultsCount) +
              Number(packageD.infantsCount) / 2)) /
            100
        ) +
        Math.floor(
          Number(packageDetails.pPrice) *
            (Number(packageD.adultsCount) + Number(packageD.infantsCount) / 2)
        ),
    });

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(result);
    const { amount, id: order_id, currency, _doc } = result.data;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "HappyTour",
      description: "Make your tour Memorable❤",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          orderIdOfCurrent: _doc._id,
        };
        // console.log(data);
        setAuth(userInfo.token);
        const result = await axios.post("/orders/payment/success", data);
        setRazorpayLoading(false)
        if (result.data.success) {
          // setAlert(result.data.message, "white", "green");
       console.log(result.data._doc,result.data)
          Swal.fire(
            'Payment Successful',
            'Ticket Reserved Successfully, You will be redirected to a page to download your ticket!',
            'success'
          ).then((result1) => {
            console.log(result)
            localStorage.removeItem("packagePurchase")
           history.push(`/tickets/${result.data._doc._id}/ticket/download`)
          })
          
        } else {
          setAlert("Payment failed", "white", "red");
        }
      },
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
      },
      theme: {
        color: "#56cc9d",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  useEffect(() => {
    if (userInfo === null || !userInfo) {
      history.push("/login");
    }
    if (!localStorage.packagePurchase) {
      history.push("/buyPackage");
    }
    if (!localStorage.paymentOption) {
      history.push("/payment");
    }
    if (!localStorage.packageDetails) {
      history.push("/packages");
    }

    // if (success) {
    //   props.history.push("/order/" + order._id);

    // }

    if (localStorage.packageDetails) {
      const packagein = JSON.parse(localStorage.packageDetails);
      setPackageDetails(packagein);
    }
    if (localStorage.packagePurchase) {
      const packageD = JSON.parse(localStorage.packagePurchase);
      setPackageD(packageD);
    }
    if (localStorage.paymentOption) {
      setPaymentOption(localStorage.paymentOption);
    }
    //eslint-disable-next-line
  }, [userInfo]);

  const placeOrderHandler = () => {
    displayRazorpay();
  };

  return (
    <>
      <Checkout step1 step2 step3 step4 />
      <>
        <Row style={{ margin: "5vh 10vw" }}>
          <Col md={8}>
            {packageD && (
              <ListGroup style={{ color: "black" }}>
                <ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <h2> Address </h2>
                  </ListGroup.Item>

                  <p className="mt-3">
                    <span>Address:</span> {packageD.address},{packageD.city},
                    {packageD.country}-{packageD.postalCode}
                  </p>
                  <Link to="/buyPackage" style={{ textDecoration: "none" }}>
                    <Button
                      type="button"
                      className="btn-block"

                      // onClick={checkoutHandler}
                    >
                      Edit Delivery Address here
                    </Button>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <h2>Payment Option</h2>
                  </ListGroup.Item>
                  <p className="mt-3">{paymentOption}</p>
                  <Link to="/payment" style={{ textDecoration: "none" }}>
                    <Button
                      type="button"
                      className="btn-block"

                      // onClick={checkoutHandler}
                    >
                      Edit Payment Option here
                    </Button>
                  </Link>
                </ListGroup.Item>
                <ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Order Items</h2>
                  </ListGroup.Item>
                  {packageDetails && (
                    <ListGroup.Item key={packageDetails._id}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={packageDetails.pImage}
                            alt={packageDetails.pName}
                            className="mb-2"
                            rounded
                            style={{ width: "100%" }}
                          />
                        </Col>
                        <Col md={6} className="my-auto">
                          <Link to={`/packages/${packageDetails._id}`}>
                            <h6>{packageDetails.pName}</h6>{" "}
                          </Link>
                        </Col>
                        <Col md={5} className="my-auto">
                          {" "}
                          <h6>
                            {Number(packageD.adultsCount) +
                              Number(packageD.infantsCount) / 2}{" "}
                            X ₹{Number(packageDetails.pPrice)}/head=₹
                            {Math.floor(
                              Number(packageDetails.pPrice) *
                                (Number(packageD.adultsCount) +
                                  Number(packageD.infantsCount) / 2)
                            )}
                          </h6>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup.Item>
                
              <ListGroup.Item>Travellers Details</ListGroup.Item>

<ListGroup>
  {packageD.travellerDetails &&
    packageD.travellerDetails.length > 0 &&
    packageD.travellerDetails.map((c) => (
      <ListGroup.Item>
        {c.name}, {c.age}, {c.idNo}
      </ListGroup.Item>
    ))}
</ListGroup>
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            {packageDetails && (
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
                    {" "}
                    <Col md={6}>Total Cost</Col>
                    <Col md={6}>
                      ₹
                      {Math.floor(
                        Number(packageDetails.pPrice) *
                          (Number(packageD.adultsCount) +
                            Number(packageD.infantsCount) / 2)
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
                        (Number(packageDetails.pPrice) *
                          (Number(packageD.adultsCount) +
                            Number(packageD.infantsCount) / 2)) /
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
                        (Number(packageDetails.pPrice) *
                          (Number(packageD.adultsCount) +
                            Number(packageD.infantsCount) / 2)) /
                          100
                      ) +
                        Math.floor(
                          Number(packageDetails.pPrice) *
                            (Number(packageD.adultsCount) +
                              Number(packageD.infantsCount) / 2)
                        )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Col md={12}>
                    <Button
                      type="button"
                      className="btn-block"
                    disabled={razorpayLoading}
                      onClick={placeOrderHandler}
                    >
                    {razorpayLoading?"Loading...":"Place Order"}  
                    </Button>
                  </Col>
                </ListGroup.Item>
              </ListGroup>
            )}
          </Col>
        </Row>
      </>
    </>
  );
};

export default PlaceOrder;
