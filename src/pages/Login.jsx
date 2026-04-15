import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/home.png";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    // Validation
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save token and user to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Navigate to services
      navigate("/services");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="login-box">
        {/* Title */}
        <h1 className="login-title">⚡ QuickBook</h1>
        <h2 className="login-subtitle">Welcome Back!</h2>

        {/* Error Message */}
        {error && <p className="error-msg">⚠️ {error}</p>}

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="📧 Email Address"
          value={formData.email}
          onChange={handleChange}
          className="login-input"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="🔒 Password"
          value={formData.password}
          onChange={handleChange}
          className="login-input"
        />

        {/* Login Button */}
        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup Link */}
        <p className="auth-link">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link-text">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;