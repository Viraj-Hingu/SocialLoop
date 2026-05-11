const mongoose = require("mongoose");
const post = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },
  caption: {
    type: String,
    required: true,
    maxlength: 500,
  },
  image_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("post", post);
