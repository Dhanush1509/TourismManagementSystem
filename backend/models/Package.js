const mongoose = require("mongoose");
let PackageSchema = new mongoose.Schema(
  {
    pName: String,
    pType: String,
    pLocation: String,
    pImage: String,
    pPrice: Number,
    pTag: String,
    pDescription: String,
    pAvailable: Number,
    pStart: Date,
    pEnd: Date,
    status: { type: Number, default: 1 },
    heart: {
      type: Number,
      default: 0,
    },
    heartedAuthors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    commentedAuthors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        text: String,
        commentAt: {
          type: Date,
          default: Date,
        },
      },
    ],
  },
  { timestamps: true }
);
PackageSchema.methods.like = function (c) {
  if (this.heartedAuthors.indexOf(c) === -1) {
    this.heart++;
    this.heartedAuthors.push(c);
  } else {
    this.heartedAuthors.splice(this.heartedAuthors.indexOf(c), 1);
    this.heart--;
  }
  return this.save();
};
PackageSchema.methods.comment = function (c, d) {
  if (this.commentedAuthors.indexOf(d) === -1) {
    this.comments.push(c);
    this.commentedAuthors.push(d);
  }

  return this.save();
};
PackageSchema.methods.addAuthor = function (author_id) {
  this.author = author_id;
  return this.save();
};
PackageSchema.methods.getUserArticle = function (_id) {
  Article.find({ author: _id }).then((article) => {
    return article;
  });
};
const Package = mongoose.model("Package", PackageSchema);
module.exports = Package;
