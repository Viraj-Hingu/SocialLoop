const postModel = require("../model/post.model");
const cloudinary = require("../config/cloudinary");
const likeModel = require("../model/like.model");

const uploadPost = (req, res) => {
  cloudinary.uploader
    .upload_stream({ folder: "socialloop" }, async (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Upload Failed",
        });
      }

      const post = await postModel.create({
        user: req.user.id,
        caption: req.body.caption,
        image_url: result.secure_url,
      });
      res.status(200).json({
        message: "Uploaded...",
        post,
      });
    })
    .end(req.file.buffer);
};

const getMyPost = async (req, res) => {
  const userID = req.user.id;

  if (!userID) {
    res.status(401).json({
      message: "user not found",
    });
  }

  const post = await Promise.all(
    (await postModel.find({ user: userID }).populate("user").lean()).map(
      async (post) => {
        const [isLiked, likesCount] = await Promise.all([
          likeModel.findOne({ username: req.user.username, postID: post._id }),
          likeModel.countDocuments({ postID: post._id }),
        ]);
        post.isLiked = !!isLiked;
        post.likesCount = likesCount;
        return post;
      },
    ),
  );

  res.status(200).json({
    message: "Post Found",
    userID,
    post,
  });
};

const getallPost = async (req, res) => {
  const user = req.user;
  const post = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {
      const [isLiked, likesCount] = await Promise.all([
        likeModel.findOne({ username: user.username, postID: post._id }),
        likeModel.countDocuments({ postID: post._id }),
      ]);
      post.isLiked = !!isLiked;
      post.likesCount = likesCount;
      return post;
    }),
  );

  if (!post || post.length === 0) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.status(200).json({
    message: "All posts",
    post,
  });
};

const likePost = async (req, res) => {
  const username = req.user.username;
  const postID = req.params.postID;

  try {
    const alreadyLiked = await likeModel.findOne({ username, postID });

    if (alreadyLiked) {
      return res.status(400).json({
        message: "Already liked",
      });
    }

    const like = await likeModel.create({ username, postID });

    return res.status(200).json({
      message: "Post liked",
      like,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error liking post",
      error: error.message,
    });
  }
};
const unLikePost = async (req, res) => {
  const username = req.user.username;
  const postID = req.params.postID;

  try {
    const findLike = await likeModel.findOne({
      username: username,
      postID: postID,
    });

    if (!findLike) {
      return res.status(400).json({
        message: "Post is not Liked",
      });
    }
    const like = await likeModel.findByIdAndDelete(findLike._id);

    return res.status(200).json({
      message: "Post get unliked",
      like,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error While unlike",
    });
  }
};
module.exports = {
  uploadPost,
  getMyPost,
  getallPost,
  likePost,
  unLikePost,
};
