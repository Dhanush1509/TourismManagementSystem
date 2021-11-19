const Article = require("../models/Article.js");
const fs = require("fs");
const cloudinary = require("cloudinary");
const asyncHandler = require("express-async-handler");

/**
 * @api {post} /api/users/createarticle Create Article
 * @apiName CreateArticle
 * @apiGroup Article
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccess {String} text  Content of article.
 * @apiSuccess {String} description description of article.
 * @apiSuccess {String} title Title of article.
 * @apiSuccess {String} imgSrc Cover image of article.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "article added successfully",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "article not saved",
 *     }
 */
exports.createArticle = asyncHandler(async (req, res) => {
  const { text, title, description } = req.body;
  let imageUrl = "";

  if (req.files.imgSrc) {
    await cloudinary.uploader.upload(
      req.files.imgSrc.path,
      (result) => {
        imageUrl = result.url;
      },
      {
        resource_type: "image",
        eager: [
          {
            effect: "sepia",
          },
        ],
      }
    );

    const article = new Article({
      text,
      title,
      image: imageUrl,
      description: description,
      author: req.user._id,
    });
    const savedArticle = await article.save();
    if (savedArticle) {
      res.status(200);
      res.json({
        message: "article added successfully",
        savedArticle,
      });
    } else {
      res.status(404);
      throw new Error("article not saved");
    }
  } else {
    const article = new Article({
      text,
      title,
      description: description,
      image: imageUrl,
      author: req.user._id,
    });

    const savedArticle = await article.save();
    if (savedArticle) {
      res.status(200);
      res.json({
        message: "article added successfully",
        savedArticle,
      });
    } else {
      res.status(404);
      throw new Error("article not saved");
    }
  }
});

/**
 * @api {get} /api/article/:articleId Get Article
 * @apiName GetArticle
 * @apiGroup Article
 *
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccess {String} text  Comment.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": " fetched article successfully",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "article not found",
 *     }
 */
exports.getArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId)
    .populate("author", "name _id")
    .populate("comments.author", "name");

  if (article) {
    res.status(200);
    res.json({
      article,
      message: "fetched article successfully",
    });
  } else {
    res.status(404);
    throw new Error("article not found");
  }
});

/**
 * @api {post} /api/article/:articleId/like Like Article
 * @apiName LikeArticle
 * @apiGroup Article
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "liked",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "remove liked",
 *     }
 */
exports.likeArticle = asyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.articleId)
    .populate("author", "name _id")
    .populate("comments.author", "name");

  const resp = await article.like(req.user._id);
  if (resp) res.json({ message: "liked", article });
  else res.json({ message: "removed liked", article });
});

/**
 * @api {post} /api/article/:articleId/comment Comment Article
 * @apiName CommentArticle
 * @apiGroup Article
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "comment added successfully",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "comment added failure",
 *     }
 */
exports.commentArticle = asyncHandler(async (req, res) => {
  console.log(req.body.comment);
  const article = await Article.findById(req.params.articleId)
    .populate("author", "name _id")
    .populate("comments.author", "name");
  console.log(article.commenta, req.user._id);
  const saveComment = {
    author: req.user._id,
    text: req.body.comment,
  };

  const resp = await article.comment(saveComment, req.user._id);
  if (resp) res.json({ message: "comment added successfully", article });
  else res.json({ message: "comment added failure", article });
});
exports.editCommentArticle = asyncHandler(async (req, res) => {
  console.log(req.body.comment);
  const article = await Article.findById(req.params.articleId)
    .populate("author", "name _id")
    .populate("comments.author", "name");

  const saveComment = {
    author: req.user._id,
    text: req.body.comment,
  };

  const resp = await article.comment(saveComment, req.user._id);
  if (resp) res.json({ message: "comment added successfully", article });
  else res.json({ message: "comment added failure", article });
});
/**
 * article_id
 */
exports.getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({})
    .populate("author")
    .populate("comments.author");
  if (articles) {
    res.status(200);
    res.json(articles);
  } else {
    res.status(404);
    throw new Error("articles not found");
  }
});
exports.getAllArticlesOfAuthor = asyncHandler(async (req, res) => {
  const articles = await Article.find({ author: req.user._id })
    .populate("author")
    .populate("comments.author");
  if (articles) {
    res.status(200);
    res.json(articles);
  } else {
    res.status(404);
    throw new Error("articles not found");
  }
});
