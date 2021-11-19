const mongoose = require("mongoose");
let ArticleSchema = new mongoose.Schema(
  {
    text: String,
    title: String,
    image: String,
    description: String,
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
ArticleSchema.methods.like = function (c) {
  if (this.heartedAuthors.indexOf(c) === -1) {
    this.heart++;
    this.heartedAuthors.push(c);
  } else {
    this.heartedAuthors.splice(this.heartedAuthors.indexOf(c), 1);
    this.heart--;
  }
  return this.save();
};
ArticleSchema.methods.comment = function (c, d) {
  if (this.commentedAuthors.indexOf(d) === -1) {
    this.comments.push(c);
    this.commentedAuthors.push(d);
  }

  return this.save();
};

ArticleSchema.methods.addAuthor = function (author_id) {
  this.author = author_id;
  return this.save();
};
ArticleSchema.methods.getUserArticle = function (_id) {
  Article.find({ author: _id }).then((article) => {
    return article;
  });
};
const Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;
