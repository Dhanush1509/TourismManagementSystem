import React, { useEffect, useState, useContext } from "react";
import orderContext from "../context/Order/OrderContext";
import axios from "axios";
import verify from "../assets/verify.png";
import notVerify from "../assets/notVerify.png";
import { Link } from "react-router-dom";
const Ticket = ({ match }) => {
  const { getOrder, order } = useContext(orderContext);
  const ref = React.createRef();
const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [4,2]
};

  useEffect(() => {
    if (match.params.orderId) {
      getOrder(match.params.orderId);
    }
  }, []);

  return (
    order && (
      <div className="ticketC">
        <div className="ticket">
			
          <div style={{ width: "70%" }}>
            <div className="block">
              <div className="boarding">
                <h2>HappyTour Boarding Pass</h2>
              </div>
              <div className="content name">
                <h3>Issued To</h3>
                <p>{order.user.name}</p>
                <p>{order.user.email}</p>
              </div>
              <div className="content from">
                <h3>Alloted Order Id</h3>
                <p>
                  <Link style={{ color: "white" }} to={`/orders/${order._id}`}>
                    {order._id}
                  </Link>
                </p>
              </div>
              <div
                style={{
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                }}
              >
                <h3>Total Tickets Booked </h3>
                <span style={{ fontSize: "24px" }}>{order.adultsCount}</span>
              </div>
            </div>
            <div style={{ width: "90%", margin: "10px 0 10px 20px" }}>
           <p>{order.ID}</p>
              <h3>Traveller Details</h3>
              <table style={{ width: "100%" }}>
                <thead>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Aadhar Number</th>
                </thead>
                <tbody>
                  {order.travellerDetails &&
                    order.travellerDetails.map((c) => (
                      <tr>
                        <td>{c.name}</td>
                        <td>{c.age}</td>
                        <td>{c.idNo}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="left-side">
            <div className="airline">PACKAGE DETAILS</div>
            <div className="name">
              <h3>Name Of Package</h3>
              <p>{order.packageInfo.pName}</p>
              <h3>Package Id</h3>
              <p>
                <Link
                  style={{ color: "black" }}
                  to={`/packages/${order.packageInfo._id}`}
                >
                  {order.packageInfo._id}
                </Link>
              </p>
            </div>
            <div className="from">
              <h3>From</h3>
              <p>{order.packageInfo.pName.split("-")[0]}</p>
            </div>
            <div className="from">
              <div className="to-m">
                <h3>To</h3>
                <p>{order.packageInfo.pName.split("-")[1]}</p>
              </div>
            </div>
			<div className="from">
              <div className="to-m">
                <h3>Verified</h3>
				<p> {order.isVerified?"true":"false"}</p>
              </div>
            </div>
		
			{order.isVerified?<div className="section-2">
              <img src={verify} alt="" style={{ width: "50px" }} />
            </div>:<div className="section-2">
              <img src={notVerify} alt="" style={{ width: "50px" }} />
            </div>}
			
          </div>
        </div>
      </div>
    )
  );
};

export default Ticket;
