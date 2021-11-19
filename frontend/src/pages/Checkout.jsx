import React from "react";
import { Nav, Container, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Badge from "@material-ui/core/Badge";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

const CheckoutSection = ({ step1, step2, step3, step4 }) => {
  return (
    <Container className="mt-1">
      <Navbar expand="lg" collapseOnSelect>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          {" "}
          <Nav className="m-auto">
            <Nav.Item>
              {step1 ? (
                <LinkContainer to="/login">
                  <Nav.Link className="mr-5">Sign In</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link className="mr-5" disabled>
                  Sign In
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item>
              {step2 ? (
                <LinkContainer to="/buyPackage">
                  <Nav.Link className="mr-5">Enter Details</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link className="mr-5" disabled>
                  Enter Details
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item>
              {step3 ? (
                <LinkContainer to="/payment">
                  <Nav.Link className="mr-5">Payment</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link className="mr-5" disabled>
                  Payment
                </Nav.Link>
              )}
            </Nav.Item>

            <Nav.Item>
              {step4 ? (
                <LinkContainer to="/placeorder">
                  <Nav.Link className="mr-5">Place Order</Nav.Link>
                </LinkContainer>
              ) : (
                <Nav.Link className="mr-5" disabled>
                  Place Order
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default CheckoutSection;
