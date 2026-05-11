import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hook/useAuth";
import { usePost } from "../hook/usePost";
import "../style/feed.css";
import { 
  RiHeartLine, 
  RiHeartFill, 
  RiBookmarkLine, 
  RiChat3Line, 
  RiSendPlaneLine 
} from "react-icons/ri";

const StoryTray = () => {
  const stories = [
    { id: 1, username: "your_story", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, username: "johndoe", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, username: "janedoe", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, username: "alex_smith", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, username: "sarah_k", avatar: "https://i.pravatar.cc/150?u=5" },
    { id: 6, username: "mike_r", avatar: "https://i.pravatar.cc/150?u=6" },
  ];

  return (
    <div className="story-tray">
      {stories.map(story => (
        <div key={story.id} className="story-item">
          <div className="story-item__avatar-wrap">
            <div className="story-item__avatar">
              <img src={story.avatar} alt={story.username} />
            </div>
          </div>
          <span className="story-item__username">{story.username}</span>
        </div>
      ))}
    </div>
  );
};

const Feed = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { handleFeed, loading, feed, handleLike, handleunLike, postError } =
    usePost();

  useEffect(() => {
    handleFeed();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="feed">
      <StoryTray />
      
      <div className="feed__create-bar">
        <div className="feed__create-avatar">
          <img src={user?.profilePicture || "https://i.pravatar.cc/150"} alt="Your profile" />
        </div>
        <button onClick={() => navigate("/createpost")} className="feed__create-btn">
          What's on your mind, {user?.username || "Guest"}?
        </button>
      </div>
      
      {postError && <p className="app-alert app-alert--error">{postError}</p>}
      
      {!feed?.length ? (
        <div className="post">
          <div className="post__caption" style={{ textAlign: 'center', padding: '40px' }}>
            <strong>No posts yet.</strong>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              Follow people or create your first post.
            </p>
          </div>
        </div>
      ) : (
        feed.map((post) => (
          <div className="post" key={post._id}>
            <div className="post__header">
              <img src={post.user?.profilePicture || "https://i.pravatar.cc/150"} alt={post.user?.username} />
              <span>{post.user?.username || "anonymous"}</span>
            </div>

            <img className="post__image" src={post.image_url} alt={post.caption || "Post image"} />

            <div className="post__actions">
              <div className="left">
                {post.isLiked ? (
                  <RiHeartFill
                    className="like"
                    onClick={() => handleunLike(post._id)}
                  />
                ) : (
                  <RiHeartLine
                    onClick={() => handleLike(post._id)}
                  />
                )}
                <RiChat3Line />
                <RiSendPlaneLine />
              </div>
              <RiBookmarkLine />
            </div>

            <div className="post__likes">
              {post.likesCount || 0} likes
            </div>

            <div className="post__caption">
              <strong>{post.user?.username || "anonymous"}</strong> {post.caption || ""}
            </div>
            
            <div className="post__comments-count">
              View all {post.commentsCount || 0} comments
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Feed;
