import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bg from "../assets/home.png";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSignup = async () => {
    const { name, email, phone, password, confirmPassword } = formData;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, phone, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      // Navigate to login after successful signup
      navigate("/login");
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="signup-box">
        {/* Title */}
        <h1 className="signup-title">⚡ QuickBook</h1>
        <h2 className="signup-subtitle">Create Account</h2>

        {/* Error Message */}
        {error && <p className="error-msg">⚠️ {error}</p>}

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="👤 Full Name"
          value={formData.name}
          onChange={handleChange}
          className="signup-input"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="📧 Email Address"
          value={formData.email}
          onChange={handleChange}
          className="signup-input"
        />

        {/* Phone Input */}
        <input
          type="text"
          name="phone"
          placeholder="📱 Phone Number (optional)"
          value={formData.phone}
          onChange={handleChange}
          className="signup-input"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="🔒 Password (min 6 characters)"
          value={formData.password}
          onChange={handleChange}
          className="signup-input"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="🔒 Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="signup-input"
        />

        {/* Signup Button */}
        <button
          className="signup-btn"
          onClick={handleSignup}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        {/* Login Link */}
        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login" className="auth-link-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;