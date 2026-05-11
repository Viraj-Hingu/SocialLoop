import { useEffect } from "react";
import { usePost } from "../hook/usePost";
import "../style/connection.css";

const UserItem = ({ user, btnText, btnClass, onBtnClick }) => (
  <div className="user-item">
    <div className="user-item__info">
      <img 
        className="user-item__avatar" 
        src={user.profilePicture || `https://i.pravatar.cc/150?u=${user.username}`} 
        alt={user.username} 
      />
      <div className="user-item__details">
        <span className="user-item__username">{user.username}</span>
        <span className="user-item__name">{user.name || user.username}</span>
      </div>
    </div>
    <button className={`user-item__btn ${btnClass}`} onClick={onBtnClick}>
      {btnText}
    </button>
  </div>
);

const Connection = () => {
  const {
    followers,
    handleShowFollowers,
    handleShowFollowing,
    following,
    handleShowSuggetion,
    suggetion,
    handleFollow,
    handleunFollow,
    loading,
    postError,
    clearPostError,
  } = usePost();

  useEffect(() => {
    clearPostError();
    handleShowFollowers();
    handleShowFollowing();
    handleShowSuggetion();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const followingSet = new Set(following.map((item) => item.following.username));

  return (
    <div className="connections-page">
      {postError && <p className="app-alert app-alert--error">{postError}</p>}
      
      <section className="connections-section">
        <h3>Suggested for you</h3>
        {suggetion.map((item) => (
          <UserItem
            key={item._id}
            user={item}
            btnText="Follow"
            btnClass="user-item__btn--primary"
            onBtnClick={async () => {
              await handleFollow(item.username);
              handleShowFollowers();
              handleShowFollowing();
              handleShowSuggetion();
            }}
          />
        ))}
      </section>

      <section className="connections-section">
        <h3>Following</h3>
        {following.map((item) => (
          <UserItem
            key={item._id}
            user={item.following}
            btnText="Following"
            btnClass="user-item__btn--secondary"
            onBtnClick={async () => {
              await handleunFollow(item.following.username);
              handleShowFollowers();
              handleShowFollowing();
              handleShowSuggetion();
            }}
          />
        ))}
      </section>

      <section className="connections-section">
        <h3>Followers</h3>
        {followers?.map((item) => {
          const isFollowingBack = followingSet.has(item.follower.username);
          return (
            <UserItem
              key={item._id}
              user={item.follower}
              btnText={isFollowingBack ? "Following" : "Follow Back"}
              btnClass={isFollowingBack ? "user-item__btn--secondary" : "user-item__btn--primary"}
              onBtnClick={async () => {
                if (isFollowingBack) {
                  await handleunFollow(item.follower.username);
                } else {
                  await handleFollow(item.follower.username);
                }
                handleShowFollowers();
                handleShowFollowing();
                handleShowSuggetion();
              }}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Connection;
