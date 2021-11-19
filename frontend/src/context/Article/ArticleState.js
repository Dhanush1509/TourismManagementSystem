import React, { useReducer, useContext } from "react";
import ArticleContext from "./ArticleContext.js";
import ArticleReducer from "./ArticleReducer.js";
import AuthContext from "../Auth/AuthContext.js";
import setAuthToken from "../../utils/setAuthToken";
import {
  ARTICLE_LOADING_END,
  ARTICLE_LOADING_START,
  CLEAR_ARTICLE_ERROR,
  CLEAR_ARTICLE_MESSAGE,
  GET_ARTICLE,
  POST_ARTICLE,
  POST_ARTICLE_ERROR,
  LIKE_ARTICLE,
  LIKE_ARTICLE_ERROR,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  GET_ARTICLES,
  GET_ARTICLES_ERROR,
} from "../types.js";
import axios from "axios";
const ArticleState = (props) => {
  const initialState = {
    articles: [],
    singleArticle: null,
    articleLoading: false,
    articleError: null,
    articleMessage: null,
    commentedArticles: null,
  };
  const { userInfo } = useContext(AuthContext);

  const [state, dispatch] = useReducer(ArticleReducer, initialState);

  const postArticle = async (formData) => {
    setAuthToken(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.post(
        "/api/articles/createarticle",
        formData,
        config
      );
      dispatch({ type: POST_ARTICLE, payload: data });
      dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: POST_ARTICLE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getArticle = async (articleId) => {
    try {
      dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.get(`/api/articles/${articleId}`);
      dispatch({ type: GET_ARTICLE, payload: data });
      dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: POST_ARTICLE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const likeArticle = async (articleId) => {
    setAuthToken(userInfo.token);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.post(
        `/api/articles/${articleId}/like`,
        config
      );
      console.log(data);
      dispatch({ type: LIKE_ARTICLE, payload: data });
      // dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: LIKE_ARTICLE_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const postComment = async (articleId, text) => {
    console.log(articleId, text);
    setAuthToken(userInfo.token);
    console.log(text, articleId);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.post(
        `/api/articles/${articleId}/comment`,
        text,
        config
      );

      dispatch({ type: POST_COMMENT, payload: data });
      // dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: POST_COMMENT_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const editComment = async (articleId, text) => {
    console.log(articleId, text);
    setAuthToken(userInfo.token);
    console.log(text, articleId);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      // dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.put(
        `/api/articles/${articleId}/comment`,
        text,
        config
      );

      dispatch({ type: POST_COMMENT, payload: data });
      // dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: POST_COMMENT_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  const getAllArticles = async () => {
    try {
      dispatch({ type: ARTICLE_LOADING_START });
      const { data } = await axios.get(`/api/articles/getarticles`);
      console.log(data);
      dispatch({ type: GET_ARTICLES, payload: data });
      dispatch({ type: ARTICLE_LOADING_END });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: GET_ARTICLES_ERROR,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
  return (
    <ArticleContext.Provider
      value={{
        postArticle,
        getArticle,
        likeArticle,
        postComment,
        getAllArticles,
        articles: state.articles,
        singleArticle: state.singleArticle,
        articleError: state.articleError,
        articleLoading: state.articleLoading,
        articleMessage: state.articleMessage,
        commentedArticles: state.commentedArticles,
      }}
    >
      {props.children}
    </ArticleContext.Provider>
  );
};
export default ArticleState;
