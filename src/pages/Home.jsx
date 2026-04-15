import { useNavigate } from "react-router-dom";
import homeBg from "../assets/home.png";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${homeBg})` }}
    >
      <div className="home-overlay" />

      <div className="home-content">
        <h1 className="home-logo">⚡ QuickBook</h1>

        <p className="home-tagline">
          Book trusted local services — instantly & effortlessly
        </p>

        <div className="home-features">
          <div className="feature-item">🏥 Hospital</div>
          <div className="feature-item">💈 Salon</div>
          <div className="feature-item">💄 Beauty</div>
          <div className="feature-item">💪 Fitness</div>
          <div className="feature-item">🏠 Home Services</div>
        </div>

        <div className="home-buttons">
          <button
            className="home-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button
            className="home-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </div>

        <p className="home-footer">Serving across Telangana 📍</p>
      </div>
    </div>
  );
}

export default Home;