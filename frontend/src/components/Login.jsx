import { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.userId);
    } catch (err) {
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">Welcome back! Please log in to access your account.</p>

        {error && <div className="login-error">{error}</div>}

        <div className="login-inputs">
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="login-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>

        <a href="#forgot" className="forgot-password">Forgot Password?</a>

        <button
          onClick={login}
          disabled={loading}
          className="login-btn-primary"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button className="login-btn-secondary">Sign Up</button>

        <div className="divider">
          <span>Or Continue with</span>
        </div>

        <div className="social-logins">
          <button className="social-btn google">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm0 23c-6.065 0-11-4.935-11-11S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11z"/>
              <path d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8z"/>
            </svg>
          </button>
          <button className="social-btn facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm0 23c-6.065 0-11-4.935-11-11S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11z"/>
            </svg>
          </button>
          <button className="social-btn apple">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm0 23c-6.065 0-11-4.935-11-11S5.935 1 12 1s11 4.935 11 11-4.935 11-11 11z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}