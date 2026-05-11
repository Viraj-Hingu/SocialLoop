import { useRef, useState } from "react";
import "../style/CreatePost.css";
import { usePost } from "../hook/usePost";
import { useAuth } from "../../auth/hook/useAuth";
import { RiImageAddLine } from "react-icons/ri";

const CreatePost = () => {
  const { handleUpload, loading, postError, setpostError, clearPostError } = usePost();
  const { user } = useAuth();
  const [caption, setcaption] = useState("");
  const [preview, setpreview] = useState("");
  const [file, setFile] = useState(null);
  const imgRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    
    const success = await handleUpload(file, caption);
    if (success) {
      setcaption("");
      setpreview("");
      setFile(null);
      if (imgRef.current) imgRef.current.value = "";
    }
  };

  const onImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) {
      setpreview("");
      setFile(null);
      return;
    }

    // Validation
    if (!selectedFile.type.startsWith("image/")) {
      handleUploadError("Please select an image file (jpg, png, etc.)");
      e.target.value = "";
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      handleUploadError("Image size should be less than 5MB");
      e.target.value = "";
      return;
    }

    clearPostError();
    setFile(selectedFile);
    setpreview(URL.createObjectURL(selectedFile));
  };

  const handleUploadError = (msg) => {
    setpostError(msg);
  };

  const triggerFileInput = () => {
    imgRef.current.click();
  };

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="create-post">
      <div className="create-post__header">
        {preview && (
          <button 
            className="create-post__back-btn" 
            onClick={() => {
              setpreview("");
              setFile(null);
            }}
          >
            Back
          </button>
        )}
        <h2>Create new post</h2>
        {preview && (
          <button className="create-post__header-btn" onClick={handleSubmit}>
            Share
          </button>
        )}
      </div>

      <div className="create-post__body">
        {postError && <p className="app-alert app-alert--error" style={{ margin: '10px' }}>{postError}</p>}
        
        {!preview ? (
          <div className="create-post__upload-area" onClick={triggerFileInput}>
            <RiImageAddLine />
            <p>Select photos and videos here</p>
            <button className="auth-submit" style={{ padding: '7px 16px' }}>Select from computer</button>
          </div>
        ) : (
          <div className="create-post__preview-container">
            <div className="create-post__image-preview">
              <img src={preview} alt="Post preview" />
            </div>
            <div className="create-post__details">
              <div className="create-post__user-info">
                <img src={user?.profilePicture || "https://i.pravatar.cc/150"} alt={user?.username} />
                <span>{user?.username}</span>
              </div>
              <textarea
                className="create-post__caption-input"
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => {
                  clearPostError();
                  setcaption(e.target.value);
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '12px' }}>
                <span>{caption.length}/2,200</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <input 
        type="file" 
        className="create-post__file-input" 
        accept="image/*" 
        ref={imgRef} 
        onChange={onImageChange} 
      />
    </div>
  );
};

export default CreatePost;
