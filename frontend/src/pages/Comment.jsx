import React, { useState, useContext, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import ArticleContext from "../context/Article/ArticleContext";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AuthContext from "../context/Auth/AuthContext";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "inlineBlock",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));
const Comment = ({ articleid }) => {
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const { postComment, singleArticle } = useContext(ArticleContext);
  const { userInfo } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    postComment(articleid, { comment: comment });
  };

  return (
    <>
      <h1 style={{ fontSize: "24px", fontWeight: "500", letterSpacing: "0px" }}>
        Comments
      </h1>

      <div className="comment-card">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicText">
            <Form.Control
              type="text"
              placeholder="Add Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>

      <>
        {singleArticle.comments.length > 0 &&
          singleArticle.comments.map((c) => (
            <div className="comment-card" style={{ margin: "10px 0 0 0" }}>
              <p style={{ fontSize: "1rem" }}> {c.text}</p>
           
              <p style={{ fontSize: "0.75rem" }}>
                Commented by {c.author.name} at{" "}
                {moment(c.commentAt).format("MMM D, YYYY")}
              </p>
            </div>
          ))}
      </>
    </>
  );
};

export default Comment;
