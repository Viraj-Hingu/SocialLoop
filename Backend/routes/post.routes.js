const postController = require("../controller/post.controller");
const expree = require("express");
const identifyUser = require("../middleware/auth.middleware");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });
const postRoutes = expree.Router();
postRoutes.post(
  "/upload",
  identifyUser,
  upload.single("image"),
  postController.uploadPost,
);

postRoutes.get("/mypost", identifyUser, postController.getMyPost);
postRoutes.get("/feed", identifyUser, postController.getallPost);
postRoutes.post("/like/:postID", identifyUser, postController.likePost);
postRoutes.post("/unlike/:postID", identifyUser, postController.unLikePost);
module.exports = postRoutes;
