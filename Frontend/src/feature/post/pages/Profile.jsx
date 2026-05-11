import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/hook/useAuth";
import { usePost } from "../hook/usePost";
import "../style/Profile.css";
import { RiSettings3Line, RiGridFill, RiVideoLine, RiPriceTag3Line } from "react-icons/ri";

const Profile = () => {
  const { user } = useAuth();
  const { images, handleMyPosts } = usePost();
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    handleMyPosts();
  }, []);

  const userPosts = images;

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header__avatar">
          <img src={user?.profilePicture || "https://i.pravatar.cc/150"} alt={user?.username} />
        </div>

        <div className="profile-header__info">
          <div className="profile-header__top">
            <h2 className="profile-header__username">{user?.username}</h2>
            <button className="profile-header__edit-btn">Edit Profile</button>
            <RiSettings3Line className="profile-header__settings" />
          </div>

          <div className="profile-header__stats">
            <span><strong>{userPosts.length}</strong> posts</span>
            <span><strong>0</strong> followers</span>
            <span><strong>0</strong> following</span>
          </div>

          <div className="profile-header__bio">
            <span className="profile-header__full-name">{user?.username}</span>
            <p>Digital Creator</p>
            <a href="#" className="profile-header__link">www.socialloop.com</a>
          </div>
        </div>
      </header>

      <div className="profile-tabs">
        <div 
          className={`profile-tab ${activeTab === "posts" ? "profile-tab--active" : ""}`}
          onClick={() => setActiveTab("posts")}
        >
          <RiGridFill /> <span>POSTS</span>
        </div>
        <div 
          className={`profile-tab ${activeTab === "reels" ? "profile-tab--active" : ""}`}
          onClick={() => setActiveTab("reels")}
        >
          <RiVideoLine /> <span>REELS</span>
        </div>
        <div 
          className={`profile-tab ${activeTab === "tagged" ? "profile-tab--active" : ""}`}
          onClick={() => setActiveTab("tagged")}
        >
          <RiPriceTag3Line /> <span>TAGGED</span>
        </div>
      </div>

      <div className="profile-grid">
        {userPosts.length > 0 ? (
          userPosts.map(post => (
            <div key={post._id} className="profile-grid__item">
              <img src={post.image_url} alt="Post content" />
            </div>
          ))
        ) : (
          <div className="profile-empty">
            <div className="profile-empty__icon"><RiGridFill /></div>
            <h2>No Posts Yet</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
