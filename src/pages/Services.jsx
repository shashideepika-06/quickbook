import { useNavigate } from "react-router-dom";
import "./Services.css";
import bg from "./../assets/home.png";

import hospitalImg from "./../assets/hospital.jpg";
import salonImg from "./../assets/salon.jpg";
import beautyImg from "./../assets/beauty.jpg";
import fitnessImg from "./../assets/fitness.jpg";
import homeImg from "./../assets/home-service.jpg";

function Services() {
  const navigate = useNavigate();

  const categories = [
    { name: "Hospital", image: hospitalImg },
    { name: "Salon", image: salonImg },
    { name: "Beauty Parlour", image: beautyImg },
    { name: "Fitness", image: fitnessImg },
    { name: "Home Services", image: homeImg },
  ];

  return (
    <div
      className="services-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* TOP BAR */}
      <div className="top-bar">
        {/* LEFT SIDE */}
        <div className="left-section">
          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-section">
          <button
            className="bookings-btn"
            onClick={() => navigate("/bookings")}
          >
            My Bookings
          </button>
          <button
            className="logout-btn"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>
        </div>
      </div>

      <h1 className="title">Select Service Category</h1>

      <div className="services-grid">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() =>
              navigate(`/category/${encodeURIComponent(cat.name)}`)
            }
          >
            <img src={cat.image} alt={cat.name} />
            <h2 className="card-title">{cat.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
