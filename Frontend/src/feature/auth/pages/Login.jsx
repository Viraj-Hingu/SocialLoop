import { useState } from "react";
import "../style/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const AuthFooter = () => (
  <div className="auth-footer">
    <a href="#">About</a>
    <a href="#">Help</a>
    <a href="#">Privacy</a>
    <a href="#">Terms</a>
    <div className="auth-copyright">© 2026 SocialLoop</div>
  </div>
);

const Login = () => {
  const { handleLogin, loading, authError, clearAuthError } = useAuth();
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirect = await handleLogin(username, password);
    if (redirect) {
      navigate("/feed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-mockup">
          <img src="/login.png" alt="Phone mockup" />
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <h1 className="auth-logo">SocialLoop</h1>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {authError && <p className="app-alert app-alert--error">{authError}</p>}
              
              <input
                className="auth-input"
                type="text"
                placeholder="Phone number, username, or email"
                value={username}
                onChange={(e) => {
                  clearAuthError();
                  setusername(e.target.value);
                }}
                required
              />
              
              <input
                className="auth-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  clearAuthError();
                  setpassword(e.target.value);
                }}
                required
              />
              
              <button className="auth-submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>
          </div>

          <div className="auth-switch">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="auth-link">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
      <AuthFooter />
    </div>
  );
};

export default Login;
