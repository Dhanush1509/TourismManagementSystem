const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/setAuthToken.js");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart();
const {
  createPackage,
  getAllPackages,
  getPackage,
  deletePackage,
  editPackage,
} = require("../controllers/packageController");

/**
 * get all articles
 */
router.route("/getpackages").get(getAllPackages);

/**
 * add an article
 */
router
  .route("/createpackage")
  .post(protect, multipartMiddleware, createPackage);
// router.route("/editpackage").put(protect,multipartMiddleware,editPackage);

/**
 * clap on an article
 */
// router.route("/:packageId/like").post(protect,likeArticle);

/**
 * comment on an article
 */
// router.route("/:packageId/comment").post(protect,commentArticle);

/**
 * get a particlular article to view
 */
router.route("/:packageId").get(getPackage);
router.route("/:pId").delete(deletePackage);
router.route("/:pId").put(editPackage);
//  router.route("/getarticlesforauthor").get(getAllArticlesOfAuthor);
module.exports = router;
