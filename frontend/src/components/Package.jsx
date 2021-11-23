import React, { useState, useContext, useEffect, useRef } from "react";
import { Row, Col, Form, Button, Spinner, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CountryList from "./Auth/CountryList";
import image from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import ParticlesBg from "particles-bg";
import AuthContext from "../context/Auth/AuthContext";
import AlertContext from "../context/Alert/AlertContext";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import PackageContext from "../context/Package/PackageContext";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Package = ({ history, location }) => {
  const classes = useStyles();
  const {
    authLoading,
    isAuthenticated,
    registerUser,
    message, 
    error,
    userInfo,
  } = useContext(AuthContext);
  const { packageLoading, tourPackage, createPackage, packageMessage } =
    useContext(PackageContext);
  const { setAlert } = useContext(AlertContext);
  useEffect(() => {
    if (packageMessage) {
      setAlert(packageMessage, "white", "green");
      history.push("/packages")
    }
    // if (tourPackage) {
    //   history.push(`/packages/${tourPackage._id}`);
    // }
  }, [tourPackage, packageMessage]);
  const [packageDetails, setPackageDetails] = useState({
    pName: "",
    pType: "",
    pLocation: "",
    pPrice: "",
    pTag: "",
    pDescription: "",
    pAvailable: "",
    pStart:"",
    pEnd:"",
    imgSrc: null,
  });
  const handleReset = () => {
    setPackageDetails({
      pName: "",
      pType: "",
      pLocation: "",
      pPrice: "",
      pTag: "",
      pDescription: "",
      pAvailable: "",
      pStart:"",
      pEnd:"",
      imgSrc: null,
    });
  }
  const handleSubmit = () => {
    if( packageDetails.pName==""|| packageDetails.pType==""|| packageDetails.pLocation==""|| packageDetails.pPrice==""|| packageDetails.pDescription==""|| packageDetails.imgSrc==""|| packageDetails.pAvailable==""){
      setAlert("Fields cannot be empty", "white", "red");
    }
    else{
      const formdata = new FormData();
      formdata.append("pName", packageDetails.pName);
      formdata.append("pType", packageDetails.pType);
      formdata.append("pLocation", packageDetails.pLocation);
      formdata.append("pPrice", packageDetails.pPrice);
      formdata.append("pTag", packageDetails.pTag);
      formdata.append("pDescription", packageDetails.pDescription);
      formdata.append("imgSrc", packageDetails.imgSrc);
      formdata.append("pAvailable", packageDetails.pAvailable);
  
      formdata.append("pStart",new Date(packageDetails.pStart).toISOString());
      formdata.append("pEnd",new Date(packageDetails.pEnd).toISOString());
      
      createPackage(formdata);
      setPackageDetails({
        pName: "",
        pType: "",
        pLocation: "",
        pPrice: "",
        pTag: "",
        pDescription: "",
        pAvailable: "",
        pStart:"",
        pEnd:"",
        imgSrc: null,
      });
    };

  
  };
  //   const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (message && message.substring(0, 20) === "A verification email") {
      history.push("/");
    }
    if (error === "User already exists") {
      setAlert(error, "white", "red");
    }

    //eslint-disable-next-line
  }, [message, error, userInfo]);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const fileUploader = useRef(null);

  const previewImg = () => {
    const file = fileUploader.current.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image_preview").src = e.target.result;

      setPackageDetails((prev) => {
        return { ...prev, imgSrc: file };
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileUploader.current.click();
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={packageLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* <ParticlesBg type="custom" bg={true} num={20} /> */}
      <Card className="mt-3 register__card">
        <Row>
          <Col md={12}>
            <div
              className="form-container"
              style={{
                textAlign: "left",
                color: "black",
                padding: "5vw",
              }}
            >
              <center>
                <h2 style={{ color: "black" }} className="mb-3">
                  Create Package
                </h2>
              </center>
              <Form>
                <Form.Group controlId="formGroupName">
                  <Form.Control
                    type="text"
                    placeholder="Package Name"
                    name="pName"
                    value={packageDetails.pName}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    maxLength="30"
                  />
                </Form.Group>
            
                <label>Tour Start Date</label>
                <Form.Group controlId="pStart">
                  <Form.Control
                    type="date"
                    placeholder="Tour Start Date"
                    name="pStart"
                    value={packageDetails.pStart}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <label>Tour End Date</label>
                <Form.Group controlId="pEnd">
                  <Form.Control
                    type="date"
                    placeholder="Tour End Date"
                    name="pEnd"
                    value={packageDetails.pEnd}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="pType">
                  <Form.Control
                    type="text"
                    placeholder="Package Type"
                    name="pType"
                    value={packageDetails.pType}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="pLocation">
                  <Form.Control
                    type="text"
                    placeholder="Package Location"
                    name="pLocation"
                    value={packageDetails.pLocation}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    minLength="6"
                  />
                </Form.Group>
                <Form.Group controlId="pAvail">
                  <Form.Control
                    type="number"
                    placeholder="Maximum Persons Allowed"
                    name="pAvailable"
                    value={packageDetails.pAvailable}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="packagePrice">
                  <Form.Control
                    type="number"
                    placeholder="Package Price"
                    name="pPrice"
                    value={packageDetails.pPrice}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="packageDescription">
                  <Form.Control
                    type="text"
                    placeholder="Package Description"
                    name="pDescription"
                    value={packageDetails.pDescription}
                    onChange={(e) => {
                      setPackageDetails({
                        ...packageDetails,
                        [e.target.name]: e.target.value,
                      });
                    }}
                    minLength="20"
                  />
                </Form.Group>
                <center>
                  <img
                    src=""
                    alt=""
                    id="image_preview"
                    style={{ width: "100%", height: "auto" }}
                  />
                </center>
                <input
                  style={{ display: "none" }}
                  type="file"
                  onChange={previewImg}
                  id="file"
                  ref={fileUploader}
                />
                <Button variant="primary" onClick={handleClick}>
                  Add Image
                </Button>
                <div
                  style={{
                    display: "flex",
                    width: "80%",
                    justifyContent: "space-between",
                    marginTop: "20px",
                  }}
                >
                  <Button variant="primary" onClick={handleSubmit}>
                    Create
                  </Button>
                  <Button variant="secondary" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Package;
