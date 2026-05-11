const userDetile = require("../model/auth.model");
const followModel = require("../model/follow.model");

const follow = async (req, res) => {
  try {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    if (followerUsername === followingUsername) {
      return res.status(400).json({
        message: "You can't follow yourself",
      });
    }

    const followerUser = await userDetile.findOne({
      username: followerUsername,
    });
    const followingUser = await userDetile.findOne({
      username: followingUsername,
    });

    if (!followerUser) {
      return res.status(404).json({
        message: "Follower user not found",
      });
    }

    if (!followingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const alreadyFollow = await followModel.findOne({
      follower: followerUser._id,
      following: followingUser._id,
    });

    if (alreadyFollow) {
      return res.status(409).json({
        message: `You already follow ${followingUsername}`,
      });
    }

    const followDoc = await followModel.create({
      follower: followerUser._id,
      following: followingUser._id,
    });

    return res.status(201).json({
      message: `You are following ${followingUsername}`,
      data: followDoc,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to follow user",
      error: error.message,
    });
  }
};

const unFollow = async (req, res) => {
  try {
    const followerUsername = req.user.username;
    const followingUsername = req.params.username;

    if (followerUsername === followingUsername) {
      return res.status(400).json({
        message: "You can't unfollow yourself",
      });
    }

    const followerUser = await userDetile.findOne({ username: followerUsername });
    const followingUser = await userDetile.findOne({ username: followingUsername });

    if (!followerUser) {
      return res.status(404).json({
        message: "Follower user not found",
      });
    }

    if (!followingUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const deletedConnection = await followModel.findOneAndDelete({
      follower: followerUser._id,
      following: followingUser._id,
    });

    if (!deletedConnection) {
      return res.status(400).json({
        message: "You are not following this user",
      });
    }

    return res.status(200).json({
      message: `You unfollowed ${followingUsername}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to unfollow user",
      error: error.message,
    });
  }
};

const getFollowings = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await userDetile.findOne({
      username,
    });

    const followings = await followModel
      .find({
        follower: user._id,
      })
      .populate("following", "username profilePicture");

    return res.status(200).json({
      count: followings.length,
      data: followings,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch followings",
      error: error.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await userDetile.findOne({
      username,
    });

    const followers = await followModel
      .find({ following: user._id })
      .populate("follower", "username profilePicture");

    return res.status(200).json({
      count: followers.length,
      data: followers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch followers",
      error: error.message,
    });
  }
};

const showSuggestedFollow = async (req, res) => {
  try {
    const userID = req.user.id;

    const following = await followModel.find({ follower: userID });
    const follower = await followModel.find({ following: userID });

    const followingID = following.map((f) => f.following);
    const followerID = follower.map((f) => f.follower);

    const exclude = [userID, ...followerID, ...followingID];

    const users = await userDetile
      .find({
        _id: { $nin: exclude },
      })
      .select("username profilePicture");

    return res.status(200).json({
      message: "Suggested user list",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to fetch suggestions",
      error: error.message,
    });
  }
};

module.exports = {
  follow,
  getFollowers,
  getFollowings,
  showSuggestedFollow,
  unFollow,
};
