const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    postID: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
  },
  { timestamps: true },
);

const likeModel = mongoose.model("Like", likeSchema);

module.exports = likeModel;
