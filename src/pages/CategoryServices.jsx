import { useNavigate, useParams } from "react-router-dom";
import "./CategoryServices.css";
import bg from "./../assets/home.png";

// --- SALON ---
import haircutImg from "./../assets/haircut.jpg";
import hairstylingImg from "./../assets/hairstyling.jpg";
import haircolorImg from "./../assets/haircolor.jpg";
import beardtrimImg from "./../assets/beardtrim.jpg";
import hairspaImg from "./../assets/hairspa.jpg";

// --- BEAUTY ---
import facialImg from "./../assets/facial.jpg";
import makeupImg from "./../assets/makeup.jpg";
import threadingImg from "./../assets/threading.jpg";
import waxingImg from "./../assets/waxing.jpg";
import skincareImg from "./../assets/skintreatment.jpg";

// --- FITNESS ---
import yogaImg from "./../assets/yoga.jpg";
import gymImg from "./../assets/gym.jpg";
import zumbaImg from "./../assets/zumba.jpg";
import weightlossImg from "./../assets/weightloss.jpg";
import personaltrainerImg from "./../assets/personaltrainer.jpg";

// --- HOSPITAL ---
import generalImg from "./../assets/general-checkup.jpg";
import dentalImg from "./../assets/dental.jpg";
import bloodtestImg from "./../assets/blood-test.jpg";
import eyeImg from "./../assets/eye.jpg";
import vaccinationImg from "./../assets/vaccination.jpg";

// --- HOME SERVICES ---
import electricianImg from "./../assets/electrician.jpg";
import plumberImg from "./../assets/plumber.jpg";
import acrepairImg from "./../assets/ac-repair.jpg";
import cleaningImg from "./../assets/cleaning.jpg";
import carpenterImg from "./../assets/carpenter.jpg";

function CategoryServices() {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const servicesData = {
    Hospital: [
      { name: "General Checkup", image: generalImg },
      { name: "Dental Checkup", image: dentalImg },
      { name: "Eye Checkup", image: eyeImg },
      { name: "Blood Test", image: bloodtestImg },
      { name: "Vaccination", image: vaccinationImg },
    ],
    Salon: [
      { name: "Haircut", image: haircutImg },
      { name: "Hair Colouring", image: haircolorImg },
      { name: "Beard Trim", image: beardtrimImg },
      { name: "Hair Spa", image: hairspaImg },
      { name: "Hair Styling", image: hairstylingImg },
    ],
    "Beauty Parlour": [
      { name: "Facial", image: facialImg },
      { name: "Makeup", image: makeupImg },
      { name: "Threading", image: threadingImg },
      { name: "Waxing", image: waxingImg },
      { name: "Skin Treatment", image: skincareImg },
    ],
    Fitness: [
      { name: "Yoga Sessions", image: yogaImg },
      { name: "Gym Training", image: gymImg },
      { name: "Zumba Class", image: zumbaImg },
      { name: "Weight Loss Program", image: weightlossImg },
      { name: "Personal Trainer", image: personaltrainerImg },
    ],
    "Home Services": [
      { name: "Electrician", image: electricianImg },
      { name: "Plumber", image: plumberImg },
      { name: "Cleaning Service", image: cleaningImg },
      { name: "Carpenter", image: carpenterImg },
      { name: "AC Repair", image: acrepairImg },
    ],
  };

  const services = servicesData[decodeURIComponent(categoryName)] || [];

  return (
    <div
      className="category-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* TOP BAR */}
      <div className="top-bar">
        <button
          className="back-btn"
          onClick={() => navigate("/services")}
        >
          ← Back
        </button>
        <button
          className="logout-btn"
          onClick={() => navigate("/login")}
        >
          Logout
        </button>
      </div>

      {/* TITLE */}
      <h1 className="title">
        {decodeURIComponent(categoryName)} - Services
      </h1>

      {/* SERVICES GRID */}
      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            onClick={() =>
              navigate(
                `/shops?service=${encodeURIComponent(service.name)}&category=${encodeURIComponent(categoryName)}`
              )
            }
          >
            <img src={service.image} alt={service.name} />
            <div className="card-title">
              <h3>{service.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryServices;