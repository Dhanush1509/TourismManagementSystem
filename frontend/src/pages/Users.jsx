import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AlertContext from "../context/Alert/AlertContext";
import AuthContext from "../context/Auth/AuthContext";
import { Modal, Form, Button } from "react-bootstrap";
const Users = ({ history }) => {
  const [users, setUsers] = useState(null);
  const { setAlert } = useContext(AlertContext);
  const { userInfo } = useContext(AuthContext);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [userD, setUserD] = useState({
    name: "",
    email: "",
    isAdmin: "",
    isActive: "",
    isVerified: "",
  });
  const [activeId, setActiveId] = useState(null);
  useEffect(() => {
    const getAllUsers = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userInfo.token,
        },
      };
      try {
        const { data } = await axios.get("/api/users", config);
        setUsers(data.userData.filter((c) => c._id !== userInfo._id));
      } catch (err) {
        setAlert(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    };
    if (userInfo && userInfo.token && userInfo.isAdmin) {
      getAllUsers();
    } else history.push("/");
  }, []);
  const editPackage = async () => {
    if (userInfo && userInfo.token && userInfo.isAdmin) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userInfo.token,
        },
      };
      try {
        const { data } = await axios.put(
          `/api/users/${activeId}`,
          userD,
          config
        );
        console.log(data);
        setUsers(users.map((c) => (c._id === activeId ? data.userData : c)));
        setEditModal(false);
        setAlert("Edit Successful", "white", "green");
      } catch (err) {
        setAlert(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
          "white",
          "red"
        );
      }
    } else history.push("/");
  };

  const openEditModal = () => {
    setEditModal(true);
  };
  const openDeleteModal = () => {
    setDeleteModal(true);
  };

  const deletePackage = async () => {
    if (userInfo && userInfo.token && userInfo.isAdmin) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userInfo.token,
        },
      };
      try {
        const { data } = await axios.delete(`/api/users/${activeId}`, config);
        setUsers(users.filter((c) => c._id !== activeId));
        setDeleteModal(false);
        setAlert("Delete Successful", "white", "green");
      } catch (err) {
        setAlert(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        );
      }
    } else history.push("/");
  };
  return (
    <div style={{ margin: "2vh 5vw", overflow: "auto", fontSize: "16px" }}>
      <>
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <label>Package Name</label>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="text"
                  maxLength="30"
                  placeholder="Package Name"
                  name="name"
                  value={userD.name}
                  onChange={(e) =>
                    setUserD({
                      ...userD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <label>Email</label>
              <Form.Group controlId="formGroupEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={userD.email}
                  onChange={(e) =>
                    setUserD({
                      ...userD,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGroupAddress">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="isActive"
                  name="isActive"
                  checked={userD.isActive}
                  onChange={(e) =>
                    setUserD({
                      ...userD,
                      [e.target.name]: e.target.checked,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGroupType">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="isVerified"
                  name="isVerified"
                  checked={userD.isVerified}
                  onChange={(e) =>
                    setUserD({
                      ...userD,
                      [e.target.name]: e.target.checked,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formGroupType">
                <Form.Check
                  type="checkbox"
                  id="default-checkbox"
                  label="isAdmin"
                  name="isAdmin"
                  checked={userD.isAdmin}
                  onChange={(e) =>
                    setUserD({
                      ...userD,
                      [e.target.name]: e.target.checked,
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
            <Modal.Title>Are you sure to Delete User?</Modal.Title>
          </Modal.Header>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setDeleteModal(false)}>
              Close
            </Button>
            <Button variant="danger" onClick={deletePackage}>
              Delete User
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col"> Id</th>
            <th scope="col"> Name</th>
            <th scope="col"> Email</th>
            <th scope="col"> Active</th>
            <th scope="col"> Verified</th>
            <th scope="col"> isAdmin</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((c, index) =>
              index % 2 === 0 ? (
                <tr class="table-active">
                  <td>{c._id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{String(c.isActive)}</td>
                  <td>{String(c.isVerified)}</td>
                  <td>{String(c.isAdmin)}</td>
                  <td
                    onClick={() => {
                      openEditModal();
                      setActiveId(c._id);
                      setUserD({
                        name: c.name,
                        email: c.email,
                        isAdmin: c.isAdmin,
                        isActive: c.isActive,
                        isVerified: c.isVerified,
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
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{String(c.isActive)}</td>
                  <td>{String(c.isVerified)}</td>
                  <td>{String(c.isAdmin)}</td>
                  <td
                    onClick={() => {
                      openEditModal();
                      setActiveId(c._id);
                      setUserD({
                        name: c.name,
                        email: c.email,
                        isAdmin: c.isAdmin,
                        isActive: c.isActive,
                        isVerified: c.isVerified,
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

export default Users;
