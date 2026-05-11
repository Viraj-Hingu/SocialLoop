import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const showFeed = async () => {
  const response = api.get("/api/post/feed");
  return (await response).data;
};

export const likePost = async (postID) => {
  const response = api.post("/api/post/like/" + postID);
  return (await response).data;
};

export const unLikePost = async (postID) => {
  const response = api.post("/api/post/unlike/" + postID);
  return (await response).data;
};

export const showFollower = async () => {
  const response = api.get("/api/user/followers/me");
  return (await response).data;
};

export const showFollowing = async () => {
  const response = api.get("/api/user/following/me");
  return (await response).data;
};

export const showSuggetion = async () => {
  const response = api.get("/api/user/suggest/me");
  return (await response).data;
};

export const follow = async (followID) => {
  const response = api.post("/api/user/follow/" + followID);
  return (await response).data;
};
export const unfollow = async (followID) => {
  const response = api.post("/api/user/unfollow/" + followID);
  return (await response).data;
};

export const uploadImg = async (imageFile, caption) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("caption", caption);

  const response = api.post("/api/post/upload", formData);

  return (await response).data;
};
