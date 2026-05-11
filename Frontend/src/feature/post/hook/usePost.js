import { useContext, useState } from "react";
import { postContext } from "../context/post.context";
import { useNavigate } from "react-router-dom";

import {
  follow,
  likePost,
  showFeed,
  showFollower,
  showFollowing,
  showMyPost,
  showSuggetion,
  unfollow,
  unLikePost,
  uploadImg,
} from "../service/post.api";

export const usePost = () => {
  const context = useContext(postContext);
  const { feed, setfeed, loading, setloading, postError, setpostError } =
    context;
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
  const [suggetion, setsuggetion] = useState([]);
  const [images, setimages] = useState([]);

  const extractErrorMessage = (error, fallbackMessage) =>
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.Messge ||
    error?.message ||
    fallbackMessage;

  const clearPostError = () => setpostError("");

  const navigate = useNavigate();
  const handleUpload = async (imageFile, caption) => {
    if (!imageFile) {
      setpostError("Please select an image before posting.");
      return false;
    }

    try {
      setloading(true);
      clearPostError();
      const data = await uploadImg(imageFile, caption);
      setfeed((prevFeed) => [data.post, ...prevFeed]);
      setimages((prevImages) => [data.post, ...prevImages]);
      navigate("/feed");
      return true;
    } catch (error) {
      setpostError(extractErrorMessage(error, "Failed to upload post"));
      return false;
    } finally {
      setloading(false);
    }
  };

  const handleFollow = async (followID) => {
    try {
      clearPostError();
      const data = await follow(followID);
      return data.data;
    } catch (error) {
      setpostError(extractErrorMessage(error, "Failed to follow user"));
      throw error;
    }
  };
  const handleunFollow = async (followID) => {
    try {
      clearPostError();
      const data = await unfollow(followID);
      return data.data;
    } catch (error) {
      setpostError(extractErrorMessage(error, "Failed to unfollow user"));
      throw error;
    }
  };

  const handleMyPosts = async () => {
    try {
      setloading(true);
      clearPostError();
      const data = await showMyPost();
      setimages(data.post);
    } catch (error) {
      setpostError(extractErrorMessage(error, "Unable to load your posts"));
    } finally {
      setloading(false);
    }
  };
  const handleFeed = async () => {
    try {
      setloading(true);
      clearPostError();
      const data = await showFeed();
      setfeed(data.post);
    } catch (error) {
      setpostError(extractErrorMessage(error, "Unable to load feed"));
    } finally {
      setloading(false);
    }
  };

  const handleLike = async (postID) => {
    try {
      clearPostError();
      await likePost(postID);
      setfeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postID
            ? { ...post, isLiked: true, likesCount: (post.likesCount || 0) + 1 }
            : post,
        ),
      );
    } catch (error) {
      setpostError(extractErrorMessage(error, "Failed to like post"));
    }
  };

  const handleunLike = async (postID) => {
    try {
      clearPostError();
      await unLikePost(postID);
      setfeed((prevFeed) =>
        prevFeed.map((post) =>
          post._id === postID
            ? {
                ...post,
                isLiked: false,
                likesCount: Math.max(0, (post.likesCount || 0) - 1),
              }
            : post,
        ),
      );
    } catch (error) {
      setpostError(extractErrorMessage(error, "Failed to unlike post"));
    }
  };

  const handleShowFollowers = async () => {
    try {
      const data = await showFollower();
      setfollowers(data.data);
    } catch (error) {
      setpostError(extractErrorMessage(error, "Unable to load followers"));
      throw error;
    }
  };

  const handleShowFollowing = async () => {
    try {
      const data = await showFollowing();
      setfollowing(data.data);
    } catch (error) {
      setpostError(extractErrorMessage(error, "Unable to load following"));
      throw error;
    }
  };

  const handleShowSuggetion = async () => {
    try {
      const data = await showSuggetion();
      setsuggetion(data.users);
    } catch (error) {
      setpostError(extractErrorMessage(error, "Unable to load suggestions"));
      throw error;
    }
  };

  return {
    handleFeed,
    feed,
    loading,
    handleLike,
    handleunLike,
    handleShowFollowers,
    setfollowers,
    followers,
    handleShowFollowing,
    following,
    handleShowSuggetion,
    suggetion,
    handleFollow,
    handleunFollow,
    handleUpload,
    handleMyPosts,
    images,
    postError,
    setpostError,
    clearPostError,
  };
};
