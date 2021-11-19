import React, { useEffect, useContext } from "react";
// import AuthContext from "../context/Auth/AuthContext";
import {

  Card,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import ArticleContext from "../context/Article/ArticleContext";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
// import Main from "./Main";

const Home = (props) => {
  const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  }));
  const classes = useStyles();
  // const { userInfo } = useContext(AuthContext);
  const { getAllArticles, articleLoading, articles } =
    useContext(ArticleContext);
  useEffect(() => {
    getAllArticles();
    //eslint-disable-next-line
  }, []);
  const handleClick = (id) => {
    console.log(id);
    props.history.push(`/article/${id}`);
  };
  return (
    <>
      {/* {userInfo && userInfo.length > 0 ? <></> : <Main />} */}
      {articleLoading ? (
         <Backdrop className={classes.backdrop} open="true">
         <CircularProgress color="inherit" />
       </Backdrop>
      ) : (
        <Row style={{ margin: "3vh 10vw 0 10vw" }}>
          {articles.length > 0 &&
            articles.map((c) => {
              // const id = c._id;
              return (
                <Col md={4}>
                  <Card style={{ width: "18rem" }}>
                    {c.image ? <Card.Img variant="top" src={c.image} /> : <></>}
                    <Card.Body>
                      <Card.Title>
                        <h3 style={{ fontWeight: "600", fontSize: "20px" }}>
                          {c.title}
                        </h3>
                      </Card.Title>
                      <Card.Text style={{ fontSize: "16px" }}>
                        {c.description.substring(0, 50)}....
                      </Card.Text>
                      <Button
                        variant="success"
                        onClick={() => {
                          handleClick(c._id);
                        }}
                      >
                        Read Article
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}{" "}
        </Row>
      )}
    </>
  );
};

export default Home;
