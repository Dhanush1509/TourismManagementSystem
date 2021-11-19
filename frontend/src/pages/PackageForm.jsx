import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckoutSection from "./Checkout";
import AuthContext from "../context/Auth/AuthContext";
import AlertContext from "../context/Alert/AlertContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// import "../App.css";
const AddressPage = (props) => {
  const { loading, error, userInfo } = useContext(AuthContext);

  const { setAlert, alerts } = useContext(AlertContext);
  const [packageD, setPackageD] = useState({
    adultsCount: 0,
    infantsCount: 0,
    address: "",
    city: "",
    postalCode: "",
    country: "",
    travellerDetails: [],
  });

  const { address, city, postalCode, country, adultsCount, infantsCount } =
    packageD;
  const onChange = (e) =>
    setPackageD({ ...packageD, [e.target.name]: e.target.value });
  const [multipleInputs, setMultipleInputs] = useState([
    {
      name: "",
      age: "",
      idNo: "",
    },
  ]);
  useEffect(() => {
    if (adultsCount > 0) {
      setMultipleInputs(
        [...Array(Number(adultsCount)).keys()].map((c) => {
          return { name: "", age: "", idNo: "" };
        })
      );
    }
  }, [adultsCount]);
  const [disabled, setDisabled] = useState(false);
  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const list = multipleInputs;
    console.log(list);
    list[i][name] = value;
    console.log(list);
    setMultipleInputs(list);
  };
  useEffect(() => {
    if (userInfo == null || !userInfo) {
      props.history.push("/signin?redirect=address");
    }
    // if (deliveryAddress) {
    //   setDelivery({
    //     address: deliveryAddress.address,
    //     city: deliveryAddress.city,
    //     postalCode: deliveryAddress.postalCode,
    //     country: deliveryAddress.country,
    //   });
    // }

    //eslint-disable-next-line
  }, [userInfo]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      address === "" ||
      city === "" ||
      postalCode === "" ||
      country === "" ||
      adultsCount === ""
    ) {
      setAlert("Fields cannot be empty", "white", "red");
    } else {
      //   saveAddress({ address, city, postalCode, country });

    
    
   


      localStorage.setItem("packagePurchase", JSON.stringify({
        ...packageD,
        travellerDetails: [...multipleInputs, ...packageD.travellerDetails],
      }));
      props.history.push("/payment");
    }
  };
  return (
    <>
      <CheckoutSection step1 step2 />
      <div
        className="form-container mb-1"
        style={{ textAlign: "left", color: "black", margin: "5vh 10vw" }}
      >
        <Form onSubmit={onSubmit} style={{ margin: "5vh 10vw" }}>
          <h1 style={{ color: "black" }}>Package Details</h1>
          <label>Total Number of Adults</label>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="number"
              placeholder="Total Number of Adults"
              name="adultsCount"
              value={adultsCount}
              onChange={onChange}
              disabled={disabled}
              onBlur={() => setDisabled(true)}
            />
          </Form.Group>
          {adultsCount > 0 && (
            <table style={{ width: "100%", margin: "20px 0" }}>
              <thead>
                <tr>
                  <th style={{ width: "33%" }}>Name</th>
                  <th style={{ width: "33%" }}>Age</th>
                  <th style={{ width: "33%" }}>Aadhar Number</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(Number(adultsCount)).keys()].map((c, index) => (
                  <tr>
                    <td>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        name="name"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        style={{ width: "100%" }}
                        name="age"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        style={{ width: "100%" }}
                        name="idNo"
                        onChange={(e) => handleChange(e, index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <label>Address</label>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Address"
              name="address"
              value={address}
              onChange={onChange}
            />
          </Form.Group>
          <label>City</label>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="City"
              name="city"
              value={city}
              onChange={onChange}
            />
          </Form.Group>
          <label>Postal Code</label>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Postal Code"
              name="postalCode"
              value={postalCode}
              onChange={onChange}
            />
          </Form.Group>
          <label>Country</label>
          <Form.Group controlId="formGroupText">
            <Form.Control
              type="text"
              placeholder="Country"
              name="country"
              value={country}
              onChange={onChange}
            />
          </Form.Group>{" "}
          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Form>{" "}
      </div>
    </>
  );
};
export default AddressPage;
