import { useState } from "react";
import "../style/auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";



const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, loading, authError, setauthError, clearAuthError } = useAuth();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Frontend validation
    if (username.length < 3) {
      setauthError("Username must be at least 3 characters long");
      return;
    }
    if (password.length < 6) {
      setauthError("Password must be at least 6 characters long");
      return;
    }

    const redirect = await handleRegister(username, email, password);
    if (redirect) {
      navigate("/login");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-mockup" style={{ animationDelay: '1s' }}>
          <img src="/register.png" alt="Community mockup" />
        </div>

        <div className="auth-form-side">
          <div className="auth-card">
            <h1 className="auth-logo">SocialLoop</h1>
            <p className="auth-subtitle">
              Sign up to see photos and videos from your friends.
            </p>

            <form className="auth-form" onSubmit={handleSubmit}>
              {authError && <p className="app-alert app-alert--error">{authError}</p>}

              <input
                className="auth-input"
                type="email"
                placeholder="Mobile Number or Email"
                value={email}
                onChange={(e) => {
                  clearAuthError();
                  setemail(e.target.value);
                }}
                required
              />

              <input
                className="auth-input"
                type="text"
                placeholder="Username"
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
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          </div>

          <div className="auth-switch">
            <p>
              Have an account?{" "}
              <Link to="/login" className="auth-link">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
