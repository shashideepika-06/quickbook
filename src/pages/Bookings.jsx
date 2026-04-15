import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookings.css";
import bg from "./../assets/home.png";

function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("All");
  const [cancelId, setCancelId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch bookings from API
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/bookings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          navigate("/login");
          return;
        }
        setError(data.message || "Failed to fetch bookings");
        return;
      }

      setBookings(data.bookings);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout handler
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // ✅ Cancel booking via API
  const confirmCancel = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${cancelId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Cancel failed");
        return;
      }

      // Update state
      setBookings(
        bookings.map((b) =>
          b._id === cancelId ? { ...b, status: "Cancelled" } : b
        )
      );
      setCancelId(null);
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  // ✅ Delete booking via API
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        alert("Delete failed");
        return;
      }

      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      alert("Server error. Please try again.");
    }
  };

  const filtered =
    filter === "All"
      ? bookings
      : bookings.filter((b) => b.status === filter);

  const getCategoryIcon = (category) => {
    const icons = {
      Hospital: "🏥",
      Salon: "💈",
      "Beauty Parlour": "💄",
      Fitness: "💪",
      "Home Services": "🏠",
    };
    return icons[category] || "📌";
  };

  return (
    <div
      className="bookings-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* TOP BAR */}
      <div className="top-bar">
        <button className="back-btn" onClick={() => navigate("/services")}>
          ← Back
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* TITLE */}
      <h1 className="title">📋 My Bookings</h1>

      {/* FILTER TABS */}
      <div className="filter-tabs">
        {["All", "Confirmed", "Cancelled"].map((tab) => (
          <button
            key={tab}
            className={`filter-tab ${filter === tab ? "active" : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
            <span className="tab-count">
              {tab === "All"
                ? bookings.length
                : bookings.filter((b) => b.status === tab).length}
            </span>
          </button>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="loading-state">
          <p className="loading-text">⏳ Loading your bookings...</p>
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="error-state">
          <p className="error-text">⚠️ {error}</p>
          <button className="retry-btn" onClick={fetchBookings}>
            Retry
          </button>
        </div>
      )}

      {/* BOOKINGS LIST */}
      {!loading && !error && filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-text">
            {filter === "All"
              ? "No bookings yet! Go book a service."
              : `No ${filter} bookings.`}
          </p>
          {filter === "All" && (
            <button
              className="go-book-btn"
              onClick={() => navigate("/services")}
            >
              Browse Services
            </button>
          )}
        </div>
      ) : (
        !loading && !error && (
          <div className="bookings-grid">
            {filtered.map((booking) => (
              <div
                key={booking._id}
                className={`booking-card ${booking.status === "Cancelled" ? "cancelled-card" : ""}`}
              >
                {/* Status Badge */}
                <span
                  className={`status-badge ${
                    booking.status === "Confirmed"
                      ? "badge-confirmed"
                      : "badge-cancelled"
                  }`}
                >
                  {booking.status === "Confirmed" ? "✅ Confirmed" : "❌ Cancelled"}
                </span>

                {/* Booking Info */}
                <h2 className="booking-shop">
                  {getCategoryIcon(booking.category)} {booking.shopName}
                </h2>
                <p className="booking-service">
                  🔧 <strong>{booking.service}</strong>
                </p>
                <p className="booking-location">📍 {booking.location}</p>

                <div className="booking-datetime">
                  <span className="booking-date">
                    📅{" "}
                    {new Date(booking.date).toLocaleDateString("en-IN", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="booking-time">🕐 {booking.time}</span>
                </div>

                <p className="booking-price">💰 {booking.price}</p>
                <p className="booking-bookedat">
                  🗓 Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleString("en-IN")}
                </p>

                {/* Action Buttons */}
                <div className="booking-actions">
                  {booking.status === "Confirmed" && (
                    <button
                      className="cancel-btn"
                      onClick={() => setCancelId(booking._id)}
                    >
                      Cancel Booking
                    </button>
                  )}
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(booking._id)}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* CANCEL CONFIRMATION POPUP */}
      {cancelId && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <p className="confirm-icon">⚠️</p>
            <h3>Cancel Booking?</h3>
            <p>Are you sure you want to cancel this booking?</p>
            <div className="confirm-actions">
              <button className="confirm-yes" onClick={confirmCancel}>
                Yes, Cancel
              </button>
              <button className="confirm-no" onClick={() => setCancelId(null)}>
                No, Keep it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookings;