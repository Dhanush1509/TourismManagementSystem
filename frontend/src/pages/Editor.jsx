import React, { useEffect, useState, useRef, useContext } from "react";
import MediumEditor from "medium-editor";
import ArticleContext from "../context/Article/ArticleContext";
import { Button, Row, Col } from "react-bootstrap";
import "../../node_modules/medium-editor/dist/css/medium-editor.min.css";
import "../../node_modules/medium-editor/dist/css/themes/tim.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import PublishIcon from "@material-ui/icons/Publish";
import IconButton from "@material-ui/core/IconButton";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Editor.module.css";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
const Editor = (props) => {
  const classes = useStyles();
  const [article, setArticle] = useState({
    title: "",
    description: "",
    text: "",
    imgSrc: "",
  });
  const fileUploader = useRef(null);
  const { postArticle, articleLoading, articleMessage, singleArticle } =
    useContext(ArticleContext);

  const formdata = new FormData();
  const handleSubmit = () => {
    formdata.append("text", article.text);
    formdata.append("imgSrc", article.imgSrc);
    formdata.append("description", article.description);
    formdata.append("title", article.title);
    postArticle(formdata);
  };
  console.log(article.description);
  useEffect(
    () => {
      if (articleMessage === "article added successfully") {
        props.history.push(`/article/${singleArticle._id}`);
      }
      const editor = new MediumEditor(/*dom, */ "#editableclass", {
        autoLink: true,
        delay: 1000,
        targetBlank: true,
        toolbar: {
          buttons: [
            "bold",
            "italic",
            "quote",
            "underline",
            "anchor",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "strikethrough",
            "subscript",
            "superscript",
            "pre",
            "image",
            "html",
            "justifyCenter",
          ],
          diffLeft: 25,
          diffTop: 10,
        },
        anchor: {
          placeholderText: "Type a link",
          customClassOption: "btn",
          customClassOptionText: "Create Button",
        },
        paste: {
          cleanPastedHTML: true,
          cleanAttrs: ["style", "dir"],
          cleanTags: ["label", "meta"],
          unwrapTags: ["sub", "sup"],
        },
        anchorPreview: {
          hideDelay: 300,
        },
        placeholder: false,
      });
      editor.subscribe("editableInput", (ev, editable) => {
        if (typeof document !== "undefined")
          setArticle((prev) => {
            return {
              ...prev,
              title: document.getElementById("editor-title").value,
              text: editor.getContent(0),
              description: document.getElementById("description").value,
            };
          });
      });
    },
    //eslint-disable-next-line
    [articleMessage]
  );

  const handleClick = () => {
    fileUploader.current.click();
  };

  const handleArticle = (e) => {
    setArticle((prev) => {
      return { ...prev, description: e.target.value };
    });
  };
  const previewImg = () => {
    const file = fileUploader.current.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById("image_preview").src = e.target.result;

      setArticle((prev) => {
        return { ...prev, imgSrc: file };
      });
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className={styles.articleEditor}>
      <Backdrop className={classes.backdrop} open={articleLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className={styles.Editor__icons}>
        <IconButton onClick={handleClick}>
          <AddAPhotoIcon style={{ color: "#003699" }} size="large" />
        </IconButton>
        <IconButton onClick={handleSubmit}>
          <PublishIcon style={{ color: "#1b8917" }} size="large" />
        </IconButton>
      </div>

      <input
        style={{ display: "none" }}
        type="file"
        onChange={previewImg}
        id="file"
        ref={fileUploader}
      />
      <div>
        <center>
          <img
            src=""
            alt=""
            id="image_preview"
            style={{ width: "100%", height: "auto" }}
          />
        </center>
        <Row>
          <Col md={10}></Col>
        </Row>
        <form className={`${styles.createnote} m-auto px-5`}>
          <textarea
            cols="1"
            className={`editor-title ${styles.editor__textarea}`}
            id="editor-title"
            placeholder="New story title here..."
          ></textarea>
          <textarea
            cols="1"
            id="description"
            placeholder="What is Article about?"
          ></textarea>
          <p className="mb-0 m-auto">Write your post below</p>
          <div id="editableclass" className={styles.editableclass}></div>
        </form>
      </div>
      <div> </div>
    </div>
  );
};

export default Editor;
