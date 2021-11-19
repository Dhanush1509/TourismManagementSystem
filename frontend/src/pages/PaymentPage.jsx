import React, { useContext, useEffect, useState } from "react";
import CheckoutSection from "./Checkout";
import { Form, Button, Col } from "react-bootstrap";
import authContext from "../context/Auth/AuthContext";
import { Link } from "react-router-dom";

const PaymentPage = (props) => {
  const { userInfo } = useContext(authContext);
  const [paymentOption, setPaymentOption] = useState("Razorpay");
  useEffect(() => {
    if (userInfo === null || !userInfo) {
      props.history.push("/signin?redirect=payment");
    }
    if (!localStorage.packagePurchase) {
      props.history.push("/buyPackage");
    }
    localStorage.setItem("paymentOption", paymentOption);
    //eslint-disable-next-line
  }, []);
  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push("/placeorder");
  };
  const onChange = (e) => {
    setPaymentOption(e.target.value);
    localStorage.setItem("paymentOption", paymentOption);
  };
  return (
    <>
      <CheckoutSection step1 step2 step3 />
      <div
        className="form-container"
        style={{ textAlign: "left", color: "black", margin: "5vh 10vw"  }}
      >
    
        <Form onSubmit={onSubmit}  style={{  margin: "5vh 10vw"  }}>
        <h1 style={{ color: "black" }}>Payment Option</h1>
          <Form.Label>Select Option</Form.Label>
          <Form.Check
            label="Razorpay"
            type="radio"
            id="Razorpay"
            name="paymentOption"
            value="Razorpay"
            checked
            onChange={onChange}
          ></Form.Check>
          <Button variant="primary" type="submit" className="mt-2">
            Continue
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PaymentPage;
