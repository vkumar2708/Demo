import { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { apiBaseUrl } from "../apiBaseUrl";

export default function Login({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const register = async () => {
    setError("");
    setSuccess("");
    
    if (!email || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${apiBaseUrl}/api/auth/register`, {
        email,
        password,
      });
      setSuccess("Account created successfully! Please login.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => setIsLogin(true), 2000);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const login = async () => {
    setError("");
    setSuccess("");
    
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.userId);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      isLogin ? login() : register();
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <h1 className="login-title">{isLogin ? "Login" : "Create Account"}</h1>
        <p className="login-subtitle">
          {isLogin ? "Welcome back! Please log in to access your account." : "Join us today! Create your account below."}
        </p>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}

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

          {!isLogin && (
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="login-input"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          )}
        </div>

        {isLogin && <a href="#forgot" className="forgot-password">Forgot Password?</a>}

        <button
          onClick={isLogin ? login : register}
          disabled={loading}
          className="login-btn-primary"
        >
          {loading ? (isLogin ? "Logging in..." : "Creating Account...") : isLogin ? "Login" : "Register"}
        </button>

        <div className="auth-toggle">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleMode} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>

        {isLogin && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
