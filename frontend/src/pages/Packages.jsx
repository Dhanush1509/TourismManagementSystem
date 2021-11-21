import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AlertContext from "../context/Alert/AlertContext";
import { Modal, Form, Button } from "react-bootstrap";
import moment from "moment";
const Packages = () => {
  const [packages, setPackages] = useState(null);
  const { setAlert } = useContext(AlertContext);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [packageD, setPackageD] = useState({
    pName: "",
    pDescription: "",
    pLocation: "",
    pType: "",
    pPrice: "",
    pAvailable: "",
    pStart: "",
    pEnd: "",
  });
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    const getAllPackages = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.get("/api/packages/getPackages", config);
        setPackages(data);
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
  const editPackage = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.put(
        `/api/packages/${activeId}`,
        {
          ...packageD,
          pStart: new Date(packageD.pStart).toISOString(),
          pEnd: new Date(packageD.pEnd).toISOString(),
        },
        config
      );
      console.log(data);
      setPackages(
        packages.map((c) => (c._id === activeId ? data.packages : c))
      );
      setEditModal(false);
      setAlert("Edit Successful", "white", "green");
    } catch (err) {
      setAlert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  const openEditModal = () => {
    setEditModal(true);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deletePackage = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.delete(`/api/packages/${activeId}`, config);
      setPackages(packages.filter((c) => c._id !== activeId));
      setDeleteModal(false);
      setAlert("Delete Successful", "white", "green");
    } catch (err) {
      setAlert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };
  return (
    <div style={{ margin: "2vh 5vw", overflow: "auto", fontSize: "16px" }}>
      <>
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header>
            <Modal.Title>Edit Package</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <label>Package Name</label>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  maxLength="30"
                  placeholder="Package Name"
                  name="pName"
                  value={packageD.pName}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Package Description</label>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  placeholder="Package Description"
                  name="pDescription"
                  value={packageD.pDescription}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Package Start Date</label>
              <Form.Group controlId="formGroupStart">
                <Form.Control
                  type="date"
                  placeholder="Package Start Date"
                  name="pStart"
                  value={packageD.pStart}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>{" "}
              <label>Package Start Date</label>
              <Form.Group controlId="formGroupEnd">
                <Form.Control
                  type="date"
                  placeholder="Package End Date"
                  name="pEnd"
                  value={packageD.pEnd}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Available Tickets</label>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="number"
                  placeholder="Available Tickets"
                  name="pAvailable"
                  value={Number(packageD.pAvailable)}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Package Location</label>
              <Form.Group controlId="formGroupAddress">
                <Form.Control
                  type="text"
                  placeholder="Package Location"
                  name="pLocation"
                  value={packageD.pLocation}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Package Type</label>
              <Form.Group controlId="formGroupType">
                <Form.Control
                  type="text"
                  placeholder="Package Type"
                  name="pType"
                  value={packageD.pType}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Package Price</label>
              <Form.Group controlId="formGroupAddress">
                <Form.Control
                  type="number"
                  placeholder="Package Price"
                  name="pPrice"
                  value={packageD.pPrice}
                  onChange={(e) =>
                    setPackageD({
                      ...packageD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={editPackage}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
          <Modal.Header>
            <Modal.Title>Are you sure to Delete Package?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={deletePackage}>
              Delete Package
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">Package Id</th>
            <th scope="col">Package Name</th>
            <th scope="col">Package Description</th>
            <th scope="col">Package Location</th>
            <th scope="col">Package Type</th>
            <th scope="col">Package Price</th>
            <th scope="col">Available Tickets</th>
            {/* <th scope="col">Package Duration</th> */}
            <th scope="col">Package Start Date</th>
            <th scope="col">Package End Date</th>
          </tr>
        </thead>
        <tbody>
          {packages &&
            packages.length > 0 &&
            packages.map((c, index) =>
              index % 2 === 0 ? (
                <tr class="table-active">
                  <td>{c._id}</td>
                  <td>{c.pName}</td>
                  <td>{c.pDescription}</td>
                  <td>{c.pLocation}</td>
                  <td>{c.pType}</td>
                  <td>{c.pPrice}</td> <td>{c.pAvailable}</td>
                  <td>{moment(c.pStart).format("MMMM Do YYYY")}</td>
                  <td>{moment(c.pEnd).format("MMMM Do YYYY")}</td>
                  <td
                    onClick={() => {
                      openEditModal();
                      setActiveId(c._id);
                      setPackageD({
                        pName: c.pName,
                        pDescription: c.pDescription,
                        pLocation: c.pLocation,
                        pType: c.pType,
                        pPrice: c.pPrice,
                        pAvailable: c.pAvailable,
                        pStart: moment(c.pStart).format("YYYY-MM-DD"),
                        pEnd: moment(c.pEnd).format("YYYY-MM-DD"),
                      });
                    }}
                  >
                    <FaEdit style={{ color: "blue", cursor: "pointer" }} />
                  </td>
                  <td
                    onClick={() => {
                      openDeleteModal();
                      setActiveId(c._id);
                    }}
                  >
                    <MdDelete style={{ color: "red", cursor: "pointer" }} />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td>{c._id}</td>
                  <td>{c.pName}</td>
                  <td>{c.pDescription}</td>
                  <td>{c.pLocation}</td>
                  <td>{c.pType}</td>
                  <td>{c.pPrice}</td>
                  <td>{c.pAvailable}</td>
                  <td>{moment(c.pStart).format("MMMM Do YYYY")}</td>
                  <td>{moment(c.pEnd).format("MMMM Do YYYY")}</td>
                  <td
                    onClick={() => {
                      openEditModal();
                      setActiveId(c._id);
                      setPackageD({
                        pName: c.pName,
                        pDescription: c.pDescription,
                        pLocation: c.pLocation,
                        pType: c.pType,
                        pPrice: c.pPrice,
                        pAvailable: c.pAvailable,
                        pStart: moment(c.pStart).format("YYYY-MM-DD"),
                        pEnd: moment(c.pEnd).format("YYYY-MM-DD"),
                      });
                    }}
                  >
                    <FaEdit style={{ color: "blue", cursor: "pointer" }} />
                  </td>
                  <td
                    onClick={() => {
                      openDeleteModal();
                      setActiveId(c._id);
                    }}
                  >
                    <MdDelete style={{ color: "red", cursor: "pointer" }} />
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
};

export default Packages;
