const express = require("express");
const followController = require("../controller/follow.controller");
const identifyUser = require("../middleware/auth.middleware");
const followRoutes = express.Router();

followRoutes.post("/follow/:username", identifyUser, followController.follow);
followRoutes.post(
  "/unfollow/:username",
  identifyUser,
  followController.unFollow,
);
followRoutes.get("/followers/me", identifyUser, followController.getFollowers);
followRoutes.get("/following/me", identifyUser, followController.getFollowings);
followRoutes.get(
  "/suggest/me",
  identifyUser,
  followController.showSuggestedFollow,
);

module.exports = followRoutes;
