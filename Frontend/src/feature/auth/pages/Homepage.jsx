import { useAuth } from "../hook/useAuth";
import { Link, Navigate } from "react-router-dom";
import "../style/auth.css";

function Homepage() {
  const { user } = useAuth();
  const isLoggedIn = Boolean(user?.username);

  if (isLoggedIn) {
    return <Navigate to="/feed" replace />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container" style={{ flexDirection: 'column', textAlign: 'center' }}>
        <h1 className="auth-logo" style={{ fontSize: '60px', marginBottom: '10px' }}>InstaByMe</h1>
        <p style={{ fontSize: '20px', color: 'var(--text-secondary)', maxWidth: '500px', marginBottom: '40px' }}>
          Capture and share the world's moments. InstaByMe is a fast, beautiful and fun way to share your life with friends and family.
        </p>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <Link to="/login" className="auth-submit" style={{ padding: '12px 40px', textDecoration: 'none' }}>
            Log In
          </Link>
          <Link to="/register" className="auth-submit" style={{ padding: '12px 40px', textDecoration: 'none', backgroundColor: 'transparent', border: '1px solid var(--border)' }}>
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
