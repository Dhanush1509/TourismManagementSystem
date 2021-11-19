import React, { useContext, useEffect, useState } from "react";
import PackageContext from "../context/Package/PackageContext";
import AuthContext from "../context/Auth/AuthContext";
import { Spinner, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ShareIcon from "@material-ui/icons/Share";
import Meta from "../components/Helmet";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
} from "react-share";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import Comment from "./Comment";
function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton>
        <ShareIcon
          fontSize="medium"
          style={{ color: "green" }}
          onClick={handleClickOpen}
        />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <EmailShareButton
              subject="Read this Article on Farm.to"
              body={window.location.href}
            >
              <IconButton>
                <MailOutlineIcon />
              </IconButton>
            </EmailShareButton>
            <WhatsappShareButton url={window.location.href}>
              <IconButton>
                <WhatsAppIcon />
              </IconButton>
            </WhatsappShareButton>
            <FacebookShareButton url={window.location.href}>
              <IconButton>
                <FacebookIcon />
              </IconButton>
            </FacebookShareButton>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Package = ({ match, history }) => {
  const classes = useStyles();
  const { getPackage, tourPackage, packageLoading } =
    useContext(PackageContext);
  const { userInfo } = useContext(AuthContext);
  const checkoutHandler = () => {
    localStorage.setItem("packageDetails", JSON.stringify(tourPackage));
    history.push("/buypackage");
  };

  useEffect(() => {
    getPackage(match.params.packageid);
    //eslint-disable-next-line
  }, []);

  return packageLoading ? (
    // <center>
    //   <Spinner
    //     animation="border"
    //     variant="primary"
    //     className="mt-5"
    //     style={{ width: "50px", height: "50px" }}
    //   />
    // </center>
    <Backdrop className={classes.backdrop} open="true">
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div className="articleEditor">
      {tourPackage ? (
        <>
          <center>
            <h1>{tourPackage.pName}</h1>
          </center>
          <>
            {/* <div className={classes.root}>
                <Avatar className={classes.large}>
                  {singleArticle.author.name?.substring(0, 1).toUpperCase()}
                </Avatar>
              </div> */}
            <p className="ml-1 my-1"></p>
            {/* <Link to={`/user/${userInfo._id}`} style={{textDecoration: 'none'}}>
                Written by {singleArticle.author.name}
              </Link> */}
            <p className="ml-1 mb-1">
              Published on {moment(tourPackage.createdAt).format("MMM D, YYYY")}
            </p>
          </>

          <p style={{ fontSize: "18px" }}>
            <span style={{ fontSize: "50px" }}>
              {tourPackage?.pDescription?.substring(0, 1)}
            </span>
            {
              tourPackage?.pDescription
                ?.substring(1, tourPackage.pDescription?.length)
                .split("@")[0]
            }
          </p>
          {tourPackage.pImage === "" ? (
            <></>
          ) : (
            <img
              src={tourPackage.pImage}
              alt="mediumImage"
              style={{ width: "100%", marginBottom: "50px" }}
            />
          )}

          {/* <Comment articleid={match.params.articleid}/> */}
        </>
      ) : (
        <></>
      )}
      <p style={{ fontSize: "18px" }}>
        {
          tourPackage?.pDescription
            ?.substring(1, tourPackage.pDescription?.length)
            .split("@")[1]
        }
      </p>
      <Row>
        <Col>
          <Button variant="warning" className="mr-5 mb-2">
            <b>Package Type:</b> {tourPackage?.pType}
          </Button>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col>
          <Button variant="danger" className="mr-5 mb-2">
            <b>Package Location:</b> {tourPackage?.pLocation}
          </Button>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col>
          <Button variant="success" className="mr-5 mb-2">
            <b>Start Date:</b>{" "}
            {moment(tourPackage?.pStart).format("MMMM Do YYYY, h:mm:ss")}
          </Button>{" "}
        </Col>
        <Col>
          {" "}
          <Button style={{background:"red"}} className="mr-5 mb-2">
            <b>End Date:</b>{" "}
            {moment(tourPackage?.pEnd).format("MMMM Do YYYY, h:mm:ss")}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="dark" className="mr-5 mb-2">
            {`Price  Rs.${tourPackage?.pPrice}/head`}
          </Button>
        </Col>
        <Col>
          {" "}
          <Button variant="info" className="mr-5 mb-2">
            {`${tourPackage?.pAvailable} Tickets Available`}
          </Button>
        </Col>
      </Row>
      <Button
        type="button"
        variant="info"
        className="btn-block"
        onClick={checkoutHandler}
        style={{ marginTop: "20px" }}
      >
        Proceed To Buy
      </Button>
    </div>
  );
};

export default Package;
