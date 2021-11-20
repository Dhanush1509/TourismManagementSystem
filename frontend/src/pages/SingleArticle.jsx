import React, { useContext, useEffect, useState } from "react";
import ArticleContext from "../context/Article/ArticleContext";
import AuthContext from "../context/Auth/AuthContext";
import { Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import ShareIcon from "@material-ui/icons/Share";
import Meta from "../components/Helmet";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
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
const SingleArticle = ({ match }) => {
  const classes = useStyles();
  const {
    singleArticle,
    getArticle,
    articleLoading,
    likeArticle,
    articleMessage,
  } = useContext(ArticleContext);
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    getArticle(match.params.articleid);

    //eslint-disable-next-line
  }, []);

  return articleLoading ? (
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
      {singleArticle ? (
        <>
    
          <center>
            <h1>{singleArticle.title}</h1>
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
              Published on{" "}
              {moment(singleArticle.createdAt).format("MMM D, YYYY")}
            </p>
            <div style={{ textAlign: "right" }}>
              {singleArticle &&
              singleArticle.heartedAuthors.indexOf(userInfo._id) > -1 ? (
                <IconButton onClick={() => likeArticle(match.params.articleid)}>
                  <FavoriteIcon fontSize="medium" style={{ color: "red" }} />
                </IconButton>
              ) : (
                <IconButton onClick={() => likeArticle(match.params.articleid)}>
                  <FavoriteBorderIcon
                    fontSize="medium"
                    style={{ color: "red" }}
                  />
                </IconButton>
              )}

              <AlertDialog />
            </div>
          </>
          {singleArticle.image === "" ? (
            <></>
          ) : (
            <img
              src={singleArticle.image}
              alt="mediumImage"
              style={{ width: "100%", marginBottom: "50px" }}
            />
          )}

          <div
            className="mb-5"
            dangerouslySetInnerHTML={{ __html: singleArticle.text }}
          ></div>
          <Comment articleid={match.params.articleid} />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SingleArticle;
