import React from "react";
import {
  ARTICLE_LOADING_START,
  ARTICLE_LOADING_END,
  CLEAR_ARTICLE_ERROR,
  CLEAR_ARTICLE_MESSAGE,
  POST_ARTICLE,
  POST_ARTICLE_ERROR,
  GET_ARTICLE,
  LIKE_ARTICLE_ERROR,
  LIKE_ARTICLE,
  POST_COMMENT,
  POST_COMMENT_ERROR,
  GET_ARTICLES,
  GET_ARTICLES_ERROR,
} from "../types";
const ArticleReducer = (state, action) => {
  switch (action.type) {
    case POST_ARTICLE:
      return {
        ...state,
        articleMessage: action.payload.message,
        singleArticle: action.payload.savedArticle,
      };
    case GET_ARTICLE:
      return {
        ...state,
        singleArticle: action.payload.article,
        articleMessage: action.payload.message,
        commentedArticles: action.payload.commentsarticle,
      };
    case GET_ARTICLES:
      return {
        ...state,
        articles: action.payload,
      };
    case LIKE_ARTICLE:
      return {
        ...state,
        articleMessage: action.payload.message,
        singleArticle: action.payload.article,
      };
    case POST_COMMENT:
      window.location.reload();
      return {
        ...state,

        singleArticle: {
          ...state.singleArticle,
          comments: [...action.payload.article.comments],
        },
      };
    case ARTICLE_LOADING_START:
      return {
        ...state,
        articleLoading: true,
      };
    case ARTICLE_LOADING_END:
      return {
        ...state,
        articleLoading: false,
      };
    case CLEAR_ARTICLE_MESSAGE:
      return {
        ...state,
        articleMessage: null,
      };
    case CLEAR_ARTICLE_ERROR:
      return {
        ...state,
        articleError: null,
      };
    case LIKE_ARTICLE_ERROR:
    case POST_ARTICLE_ERROR:
    case GET_ARTICLES_ERROR:
    case POST_COMMENT_ERROR:
      return {
        ...state,
        articleError: action.payload,
      };

    default:
      return state;
  }
};
export default ArticleReducer;
