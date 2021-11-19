const Package = require("../models/Package.js");
const fs = require("fs");
const cloudinary = require("cloudinary");
const asyncHandler = require("express-async-handler");

/**
 * @api {post} /api/packages/createpackage Create Package
 * @apiName CreatePackage
 * @apiGroup Package
 *
 * @apiHeader (authentication) {String} x-auth-token JWT.
 * @apiSuccess {String} pName Name of Package.
 * @apiSuccess {String} pType Type of Package.
 * @apiSuccess {String} pTag Tag of Package.
 * @apiSuccess {String} pDescription Description of Package.
 * @apiSuccess {String} pPrice Price of Package.
 * @apiSuccess {String} pImage Cover image of Package.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Package added successfully",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Package not saved",
 *     }
 */
exports.createPackage = asyncHandler(async (req, res) => {
  const {
    pName,
    pType,
    pLocation,
    pPrice,
    pTag,
    pDescription,
    pAvailable,
    pStart,
    pEnd,
  } = req.body;
  let imageUrl = "";
  console.log(req);
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

    const package = new Package({
      pName,
      pType,
      pLocation,
      pImage: imageUrl,
      pPrice,
      pTag,
      pDescription,
      author: req.user._id,
      pAvailable,
      pStart,
      pEnd,
    });
    const savedPackage = await package.save();
    if (savedPackage) {
      res.status(200);
      res.json({
        message: "Package added successfully",
        savedPackage,
      });
    } else {
      res.status(404);
      throw new Error("Package not saved");
    }
  } else {
    const package = new Package({
      pName,
      pType,
      pLocation,
      pImage: imageUrl,
      pPrice,
      pTag,
      pDescription,
      author: req.user._id,
      pAvailable,
      pStart,
      pEnd,
    });
    const savedPackage = await package.save();
    if (savedPackage) {
      res.status(200);
      res.json({
        message: "Package added successfully",
        savedPackage,
      });
    } else {
      res.status(404);
      throw new Error("Package not saved");
    }
  }
});

/**
 * @api {post} /api/packages/:packageId Get Package
 * @apiName GetPackage
 * @apiGroup Package
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Package fetched successfully",
 *     }
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Package not found",
 *     }
 */
exports.getPackage = asyncHandler(async (req, res) => {
  const package = await Package.findById(req.params.packageId);

  if (package) {
    res.status(200);
    res.json({
      package,
      message: "fetched package successfully",
    });
  } else {
    res.status(404);
    throw new Error("package not found");
  }
});

/**
 * article_id
 */
// exports.likeArticle = asyncHandler(async (req, res) => {
//   const article = await Article.findById(req.params.articleId)
//     .populate("comments")
//     .populate("author");

//   await article.like(req.user._id);
//   res.json({ message: "liked", article });
// });

// exports.commentArticle = asyncHandler(async (req, res) => {
//   console.log(req.body.comment);
//   const article = await Article.findById(req.params.articleId)
//     .populate("comments.author")
//     .populate("author");

//   const saveComment = {
//     author: req.user._id,
//     text: req.body.comment,
//   };

//   await article.comment(saveComment, req.user._id);

//   res.json({ message: "comment added successfully", article });
// });

/**
 * article_id
 */
exports.deletePackage = asyncHandler(async (req, res) => {
  const packages = await Package.findById(req.params.pId);
  if (packages) {
    await packages.remove();
    res.status(200).json({ message: "Deletion Successful" });
  } else {
    res.status(400);
    throw new Error("Package deletion unsuccessful");
  }
});
exports.editPackage = asyncHandler(async (req, res) => {
  const packages = await Package.findById(req.params.pId);
  if (packages) {
    if (req.body.pName) packages.pName = req.body.pName;
    if (req.body.pDescription) packages.pDescription = req.body.pDescription;
    if (req.body.pLocation) packages.pLocation = req.body.pLocation;
    if (req.body.pType) packages.pType = req.body.pType;
    if (req.body.pPrice) packages.pPrice = req.body.pPrice;
    if (req.body.pAvailable) packages.pAvailable = req.body.pAvailable;
    if (req.body.pStart) packages.pStart = req.body.pStart;
    if (req.body.pEnd) packages.pEnd = req.body.pEnd;

    await packages.save();
    res.status(200).json({ message: "Update Successful", packages });
  } else {
    res.status(400);
    throw new Error("Update unsuccessful");
  }
});
exports.getAllPackages = asyncHandler(async (req, res) => {
  const packages = await Package.find({})
    .populate("author")
    .populate("comments.author");
  if (packages) {
    res.status(200);
    res.json(packages);
  } else {
    res.status(404);
    throw new Error("packages not found");
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
