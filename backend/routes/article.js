const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/setAuthToken.js");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const {
  getArticle,
  getAllArticles,
  likeArticle,
  commentArticle,
  createArticle,
  getAllArticlesOfAuthor,
} = require("../controllers/article.js");

/**
 * get all articles
 */
router.route("/getarticles").get(getAllArticles);

/**
 * add an article
 */
router
  .route("/createarticle")
  .post(protect, multipartMiddleware, createArticle);

/**
 * clap on an article
 */
router.route("/:articleId/like").post(protect, likeArticle);

/**
 * comment on an article
 */
router.route("/:articleId/comment").post(protect, commentArticle);

/**
 * get a particlular article to view
 */
router.route("/:articleId").get(getArticle);
router.route("/getarticlesforauthor").get(getAllArticlesOfAuthor);
module.exports = router;
