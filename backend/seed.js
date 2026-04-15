import mongoose from "mongoose";
import dotenv from "dotenv";
import Shop from "./models/Shop.js";

dotenv.config();

const shops = [
  // ── HOSPITAL ──────────────────────────────────────────
  { name: "Apollo Clinic", location: "Banjara Hills, Hyderabad", category: "Hospital", service: "General Checkup", rating: 4.8, price: "₹800", experience: "15 years" },
  { name: "Yashoda Hospital", location: "Secunderabad, Hyderabad", category: "Hospital", service: "General Checkup", rating: 4.6, price: "₹600", experience: "12 years" },
  { name: "KIMS Hospital", location: "Kondapur, Hyderabad", category: "Hospital", service: "General Checkup", rating: 4.7, price: "₹750", experience: "20 years" },
  { name: "Citizens Hospital", location: "Narsingi, Hyderabad", category: "Hospital", service: "General Checkup", rating: 4.5, price: "₹500", experience: "10 years" },
  { name: "Care Hospital", location: "Gachibowli, Hyderabad", category: "Hospital", service: "General Checkup", rating: 4.4, price: "₹650", experience: "8 years" },
  { name: "Medicover Hospital", location: "Warangal, Telangana", category: "Hospital", service: "General Checkup", rating: 4.3, price: "₹550", experience: "9 years" },

  { name: "Smile Dental Clinic", location: "Jubilee Hills, Hyderabad", category: "Hospital", service: "Dental Checkup", rating: 4.9, price: "₹1200", experience: "14 years" },
  { name: "Dental World", location: "Gachibowli, Hyderabad", category: "Hospital", service: "Dental Checkup", rating: 4.7, price: "₹1000", experience: "11 years" },
  { name: "Pearl Dental Studio", location: "Kondapur, Hyderabad", category: "Hospital", service: "Dental Checkup", rating: 4.6, price: "₹900", experience: "9 years" },
  { name: "32 Pearls Dentistry", location: "Banjara Hills, Hyderabad", category: "Hospital", service: "Dental Checkup", rating: 4.5, price: "₹1500", experience: "13 years" },
  { name: "BrightSmile Clinic", location: "Warangal, Telangana", category: "Hospital", service: "Dental Checkup", rating: 4.4, price: "₹800", experience: "7 years" },
  { name: "Tooth Care Centre", location: "Karimnagar, Telangana", category: "Hospital", service: "Dental Checkup", rating: 4.3, price: "₹950", experience: "6 years" },

  { name: "LV Prasad Eye Institute", location: "Banjara Hills, Hyderabad", category: "Hospital", service: "Eye Checkup", rating: 4.9, price: "₹1000", experience: "25 years" },
  { name: "Maxivision Eye Hospital", location: "Secunderabad, Hyderabad", category: "Hospital", service: "Eye Checkup", rating: 4.8, price: "₹800", experience: "18 years" },
  { name: "Sarada Eye Clinic", location: "Kondapur, Hyderabad", category: "Hospital", service: "Eye Checkup", rating: 4.6, price: "₹700", experience: "10 years" },
  { name: "Eye Care Centre", location: "Gachibowli, Hyderabad", category: "Hospital", service: "Eye Checkup", rating: 4.5, price: "₹600", experience: "8 years" },
  { name: "Vision Plus", location: "Warangal, Telangana", category: "Hospital", service: "Eye Checkup", rating: 4.4, price: "₹750", experience: "7 years" },
  { name: "Lotus Eye Hospital", location: "Karimnagar, Telangana", category: "Hospital", service: "Eye Checkup", rating: 4.7, price: "₹900", experience: "12 years" },

  { name: "SRL Diagnostics", location: "Ameerpet, Hyderabad", category: "Hospital", service: "Blood Test", rating: 4.8, price: "₹600", experience: "16 years" },
  { name: "Thyrocare Lab", location: "Kondapur, Hyderabad", category: "Hospital", service: "Blood Test", rating: 4.7, price: "₹500", experience: "14 years" },
  { name: "Dr. Lal PathLabs", location: "Banjara Hills, Hyderabad", category: "Hospital", service: "Blood Test", rating: 4.6, price: "₹650", experience: "12 years" },
  { name: "Metropolis Lab", location: "Secunderabad, Hyderabad", category: "Hospital", service: "Blood Test", rating: 4.5, price: "₹550", experience: "10 years" },
  { name: "Apollo Diagnostics", location: "Gachibowli, Hyderabad", category: "Hospital", service: "Blood Test", rating: 4.7, price: "₹700", experience: "15 years" },
  { name: "Vijaya Diagnostics", location: "Warangal, Telangana", category: "Hospital", service: "Blood Test", rating: 4.4, price: "₹480", experience: "9 years" },

  { name: "Apollo Vaccine Centre", location: "Jubilee Hills, Hyderabad", category: "Hospital", service: "Vaccination", rating: 4.8, price: "₹1500", experience: "12 years" },
  { name: "KIMS Vaccine Clinic", location: "Kondapur, Hyderabad", category: "Hospital", service: "Vaccination", rating: 4.6, price: "₹1200", experience: "10 years" },
  { name: "LifeCare Immunization", location: "Gachibowli, Hyderabad", category: "Hospital", service: "Vaccination", rating: 4.5, price: "₹1000", experience: "8 years" },
  { name: "Shield Health Clinic", location: "Secunderabad, Hyderabad", category: "Hospital", service: "Vaccination", rating: 4.7, price: "₹1800", experience: "11 years" },
  { name: "VaxCare Centre", location: "Warangal, Telangana", category: "Hospital", service: "Vaccination", rating: 4.4, price: "₹1300", experience: "7 years" },
  { name: "Immunity Plus", location: "Karimnagar, Telangana", category: "Hospital", service: "Vaccination", rating: 4.3, price: "₹1100", experience: "6 years" },

  // ── SALON ──────────────────────────────────────────────
  { name: "Naturals Salon", location: "Banjara Hills, Hyderabad", category: "Salon", service: "Haircut", rating: 4.8, price: "₹400", experience: "12 years" },
  { name: "Lakme Salon", location: "Jubilee Hills, Hyderabad", category: "Salon", service: "Haircut", rating: 4.7, price: "₹600", experience: "15 years" },
  { name: "Green Trends", location: "Kondapur, Hyderabad", category: "Salon", service: "Haircut", rating: 4.6, price: "₹350", experience: "10 years" },
  { name: "Toni & Guy", location: "Gachibowli, Hyderabad", category: "Salon", service: "Haircut", rating: 4.9, price: "₹1200", experience: "18 years" },
  { name: "Style Hub", location: "Secunderabad, Hyderabad", category: "Salon", service: "Haircut", rating: 4.4, price: "₹300", experience: "7 years" },
  { name: "Scissors & Comb", location: "Warangal, Telangana", category: "Salon", service: "Haircut", rating: 4.3, price: "₹250", experience: "5 years" },
  { name: "Urban Snip", location: "Karimnagar, Telangana", category: "Salon", service: "Haircut", rating: 4.5, price: "₹320", experience: "8 years" },

  { name: "Lakme Colour Studio", location: "Jubilee Hills, Hyderabad", category: "Salon", service: "Hair Colouring", rating: 4.9, price: "₹2500", experience: "15 years" },
  { name: "Toni & Guy Colour", location: "Banjara Hills, Hyderabad", category: "Salon", service: "Hair Colouring", rating: 4.8, price: "₹3500", experience: "18 years" },
  { name: "Naturals Colour Bar", location: "Gachibowli, Hyderabad", category: "Salon", service: "Hair Colouring", rating: 4.7, price: "₹2000", experience: "12 years" },
  { name: "ChromeHair Studio", location: "Kondapur, Hyderabad", category: "Salon", service: "Hair Colouring", rating: 4.6, price: "₹2800", experience: "9 years" },
  { name: "Hue & Style", location: "Secunderabad, Hyderabad", category: "Salon", service: "Hair Colouring", rating: 4.5, price: "₹1800", experience: "7 years" },
  { name: "Colour Me Beautiful", location: "Warangal, Telangana", category: "Salon", service: "Hair Colouring", rating: 4.4, price: "₹1500", experience: "6 years" },

  { name: "The Barber Club", location: "Banjara Hills, Hyderabad", category: "Salon", service: "Beard Trim", rating: 4.8, price: "₹350", experience: "10 years" },
  { name: "Razor Sharp", location: "Jubilee Hills, Hyderabad", category: "Salon", service: "Beard Trim", rating: 4.7, price: "₹400", experience: "8 years" },
  { name: "Gentleman's Grooming", location: "Gachibowli, Hyderabad", category: "Salon", service: "Beard Trim", rating: 4.9, price: "₹600", experience: "12 years" },
  { name: "Classic Cuts", location: "Kondapur, Hyderabad", category: "Salon", service: "Beard Trim", rating: 4.5, price: "₹280", experience: "6 years" },
  { name: "Urban Barber", location: "Secunderabad, Hyderabad", category: "Salon", service: "Beard Trim", rating: 4.4, price: "₹320", experience: "5 years" },
  { name: "Kings Barbershop", location: "Warangal, Telangana", category: "Salon", service: "Beard Trim", rating: 4.6, price: "₹300", experience: "9 years" },
  { name: "Fade Masters", location: "Karimnagar, Telangana", category: "Salon", service: "Beard Trim", rating: 4.3, price: "₹250", experience: "4 years" },

  { name: "Lakme Spa Lounge", location: "Jubilee Hills, Hyderabad", category: "Salon", service: "Hair Spa", rating: 4.9, price: "₹1800", experience: "15 years" },
  { name: "Naturals Hair Spa", location: "Banjara Hills, Hyderabad", category: "Salon", service: "Hair Spa", rating: 4.7, price: "₹1500", experience: "12 years" },
  { name: "Serene Hair Studio", location: "Gachibowli, Hyderabad", category: "Salon", service: "Hair Spa", rating: 4.6, price: "₹1200", experience: "8 years" },
  { name: "Glow & Grow Spa", location: "Kondapur, Hyderabad", category: "Salon", service: "Hair Spa", rating: 4.5, price: "₹1400", experience: "7 years" },
  { name: "HairLux Spa", location: "Secunderabad, Hyderabad", category: "Salon", service: "Hair Spa", rating: 4.4, price: "₹1100", experience: "6 years" },
  { name: "TresseMe Salon", location: "Warangal, Telangana", category: "Salon", service: "Hair Spa", rating: 4.3, price: "₹1000", experience: "5 years" },

  { name: "Toni & Guy Styling", location: "Banjara Hills, Hyderabad", category: "Salon", service: "Hair Styling", rating: 4.9, price: "₹2000", experience: "18 years" },
  { name: "Lakme Style Studio", location: "Jubilee Hills, Hyderabad", category: "Salon", service: "Hair Styling", rating: 4.8, price: "₹1800", experience: "15 years" },
  { name: "Flaunt Salon", location: "Gachibowli, Hyderabad", category: "Salon", service: "Hair Styling", rating: 4.6, price: "₹1500", experience: "10 years" },
  { name: "Glam Studio", location: "Kondapur, Hyderabad", category: "Salon", service: "Hair Styling", rating: 4.5, price: "₹1200", experience: "8 years" },
  { name: "Curl & Twist", location: "Secunderabad, Hyderabad", category: "Salon", service: "Hair Styling", rating: 4.4, price: "₹1000", experience: "6 years" },
  { name: "Style Icon", location: "Warangal, Telangana", category: "Salon", service: "Hair Styling", rating: 4.3, price: "₹900", experience: "5 years" },

  // ── BEAUTY PARLOUR ─────────────────────────────────────
  { name: "Lakme Beauty Parlour", location: "Jubilee Hills, Hyderabad", category: "Beauty Parlour", service: "Facial", rating: 4.9, price: "₹2500", experience: "15 years" },
  { name: "Naturals Beauty", location: "Banjara Hills, Hyderabad", category: "Beauty Parlour", service: "Facial", rating: 4.7, price: "₹2000", experience: "12 years" },
  { name: "Glow Beauty Studio", location: "Gachibowli, Hyderabad", category: "Beauty Parlour", service: "Facial", rating: 4.8, price: "₹2800", experience: "10 years" },
  { name: "Radiance Parlour", location: "Kondapur, Hyderabad", category: "Beauty Parlour", service: "Facial", rating: 4.6, price: "₹2200", experience: "8 years" },
  { name: "Blush Beauty", location: "Secunderabad, Hyderabad", category: "Beauty Parlour", service: "Facial", rating: 4.5, price: "₹1800", experience: "6 years" },
  { name: "Femina Studio", location: "Warangal, Telangana", category: "Beauty Parlour", service: "Facial", rating: 4.4, price: "₹1500", experience: "7 years" },
  { name: "Glamour Zone", location: "Karimnagar, Telangana", category: "Beauty Parlour", service: "Facial", rating: 4.3, price: "₹1200", experience: "5 years" },

  { name: "MAC Studio Hyderabad", location: "Banjara Hills, Hyderabad", category: "Beauty Parlour", service: "Makeup", rating: 4.9, price: "₹8000", experience: "15 years" },
  { name: "Lakme Makeup Studio", location: "Jubilee Hills, Hyderabad", category: "Beauty Parlour", service: "Makeup", rating: 4.8, price: "₹6000", experience: "12 years" },
  { name: "Bridal Bliss", location: "Gachibowli, Hyderabad", category: "Beauty Parlour", service: "Makeup", rating: 4.7, price: "₹15000", experience: "10 years" },
  { name: "Face Art Studio", location: "Kondapur, Hyderabad", category: "Beauty Parlour", service: "Makeup", rating: 4.6, price: "₹7000", experience: "8 years" },
  { name: "Glam Squad", location: "Secunderabad, Hyderabad", category: "Beauty Parlour", service: "Makeup", rating: 4.5, price: "₹5000", experience: "6 years" },
  { name: "Beauty Craft", location: "Warangal, Telangana", category: "Beauty Parlour", service: "Makeup", rating: 4.4, price: "₹4000", experience: "5 years" },

  { name: "Naturals Parlour", location: "Banjara Hills, Hyderabad", category: "Beauty Parlour", service: "Threading", rating: 4.7, price: "₹100", experience: "12 years" },
  { name: "Lakme Beauty", location: "Jubilee Hills, Hyderabad", category: "Beauty Parlour", service: "Threading", rating: 4.6, price: "₹120", experience: "10 years" },
  { name: "Silky Touch Parlour", location: "Gachibowli, Hyderabad", category: "Beauty Parlour", service: "Threading", rating: 4.5, price: "₹80", experience: "8 years" },
  { name: "Pretty Up Salon", location: "Kondapur, Hyderabad", category: "Beauty Parlour", service: "Threading", rating: 4.4, price: "₹90", experience: "6 years" },
  { name: "Quick Groom", location: "Secunderabad, Hyderabad", category: "Beauty Parlour", service: "Threading", rating: 4.3, price: "₹70", experience: "5 years" },
  { name: "Femcare Beauty", location: "Warangal, Telangana", category: "Beauty Parlour", service: "Threading", rating: 4.5, price: "₹110", experience: "7 years" },
  { name: "Brow Bar", location: "Karimnagar, Telangana", category: "Beauty Parlour", service: "Threading", rating: 4.6, price: "₹150", experience: "9 years" },

  { name: "Naturals Wax Studio", location: "Banjara Hills, Hyderabad", category: "Beauty Parlour", service: "Waxing", rating: 4.7, price: "₹800", experience: "12 years" },
  { name: "Lakme Wax Bar", location: "Jubilee Hills, Hyderabad", category: "Beauty Parlour", service: "Waxing", rating: 4.6, price: "₹1000", experience: "10 years" },
  { name: "Smooth Skin Studio", location: "Gachibowli, Hyderabad", category: "Beauty Parlour", service: "Waxing", rating: 4.8, price: "₹1200", experience: "9 years" },
  { name: "Silky Finish", location: "Kondapur, Hyderabad", category: "Beauty Parlour", service: "Waxing", rating: 4.5, price: "₹700", experience: "7 years" },
  { name: "Pure Beauty", location: "Secunderabad, Hyderabad", category: "Beauty Parlour", service: "Waxing", rating: 4.4, price: "₹900", experience: "6 years" },
  { name: "Glow Wax Centre", location: "Warangal, Telangana", category: "Beauty Parlour", service: "Waxing", rating: 4.3, price: "₹600", experience: "5 years" },

  { name: "Kaya Skin Clinic", location: "Banjara Hills, Hyderabad", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.9, price: "₹5000", experience: "18 years" },
  { name: "Oliva Skin Clinic", location: "Jubilee Hills, Hyderabad", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.8, price: "₹4000", experience: "15 years" },
  { name: "VLCC Wellness", location: "Gachibowli, Hyderabad", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.7, price: "₹3500", experience: "12 years" },
  { name: "SkinCity Clinic", location: "Kondapur, Hyderabad", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.6, price: "₹4500", experience: "10 years" },
  { name: "DermaCare Studio", location: "Secunderabad, Hyderabad", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.5, price: "₹3000", experience: "8 years" },
  { name: "ClearSkin Centre", location: "Warangal, Telangana", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.4, price: "₹2500", experience: "7 years" },
  { name: "GlowUp Derma", location: "Karimnagar, Telangana", category: "Beauty Parlour", service: "Skin Treatment", rating: 4.3, price: "₹2000", experience: "5 years" },

  // ── FITNESS ────────────────────────────────────────────
  { name: "Isha Yoga Centre", location: "Gachibowli, Hyderabad", category: "Fitness", service: "Yoga Sessions", rating: 4.9, price: "₹3000/month", experience: "20 years" },
  { name: "Art of Living", location: "Banjara Hills, Hyderabad", category: "Fitness", service: "Yoga Sessions", rating: 4.8, price: "₹2500/month", experience: "18 years" },
  { name: "Yoga Tree Studio", location: "Jubilee Hills, Hyderabad", category: "Fitness", service: "Yoga Sessions", rating: 4.7, price: "₹2000/month", experience: "10 years" },
  { name: "Mind & Body Yoga", location: "Kondapur, Hyderabad", category: "Fitness", service: "Yoga Sessions", rating: 4.6, price: "₹2200/month", experience: "8 years" },
  { name: "Sunrise Yoga", location: "Secunderabad, Hyderabad", category: "Fitness", service: "Yoga Sessions", rating: 4.5, price: "₹1800/month", experience: "7 years" },
  { name: "ZenFlow Studio", location: "Warangal, Telangana", category: "Fitness", service: "Yoga Sessions", rating: 4.4, price: "₹1500/month", experience: "5 years" },
  { name: "Bliss Yoga Hub", location: "Karimnagar, Telangana", category: "Fitness", service: "Yoga Sessions", rating: 4.3, price: "₹1200/month", experience: "4 years" },

  { name: "Gold's Gym", location: "Banjara Hills, Hyderabad", category: "Fitness", service: "Gym Training", rating: 4.9, price: "₹3500/month", experience: "20 years" },
  { name: "Fitness First", location: "Gachibowli, Hyderabad", category: "Fitness", service: "Gym Training", rating: 4.8, price: "₹4500/month", experience: "15 years" },
  { name: "Cult.fit Gym", location: "Jubilee Hills, Hyderabad", category: "Fitness", service: "Gym Training", rating: 4.7, price: "₹4000/month", experience: "10 years" },
  { name: "Iron Paradise", location: "Kondapur, Hyderabad", category: "Fitness", service: "Gym Training", rating: 4.6, price: "₹3000/month", experience: "8 years" },
  { name: "PowerHouse Gym", location: "Secunderabad, Hyderabad", category: "Fitness", service: "Gym Training", rating: 4.5, price: "₹2500/month", experience: "7 years" },
  { name: "FitZone", location: "Warangal, Telangana", category: "Fitness", service: "Gym Training", rating: 4.4, price: "₹2000/month", experience: "6 years" },
  { name: "BodyCraft Gym", location: "Karimnagar, Telangana", category: "Fitness", service: "Gym Training", rating: 4.3, price: "₹1800/month", experience: "5 years" },

  { name: "Cult.fit Zumba", location: "Gachibowli, Hyderabad", category: "Fitness", service: "Zumba Class", rating: 4.9, price: "₹2500/month", experience: "10 years" },
  { name: "DanceZone Studio", location: "Banjara Hills, Hyderabad", category: "Fitness", service: "Zumba Class", rating: 4.7, price: "₹2000/month", experience: "8 years" },
  { name: "Rhythmic Fitness", location: "Jubilee Hills, Hyderabad", category: "Fitness", service: "Zumba Class", rating: 4.8, price: "₹2200/month", experience: "9 years" },
  { name: "Beat & Burn", location: "Kondapur, Hyderabad", category: "Fitness", service: "Zumba Class", rating: 4.6, price: "₹1800/month", experience: "7 years" },
  { name: "Zumba Fiesta", location: "Secunderabad, Hyderabad", category: "Fitness", service: "Zumba Class", rating: 4.5, price: "₹1500/month", experience: "6 years" },
  { name: "FunFit Studio", location: "Warangal, Telangana", category: "Fitness", service: "Zumba Class", rating: 4.4, price: "₹1200/month", experience: "5 years" },

  { name: "VLCC Slimming", location: "Banjara Hills, Hyderabad", category: "Fitness", service: "Weight Loss Program", rating: 4.9, price: "₹8000/month", experience: "20 years" },
  { name: "Naturals Wellness", location: "Jubilee Hills, Hyderabad", category: "Fitness", service: "Weight Loss Program", rating: 4.7, price: "₹6000/month", experience: "15 years" },
  { name: "SlimFit Centre", location: "Gachibowli, Hyderabad", category: "Fitness", service: "Weight Loss Program", rating: 4.8, price: "₹7000/month", experience: "12 years" },
  { name: "BodyGoal Studio", location: "Kondapur, Hyderabad", category: "Fitness", service: "Weight Loss Program", rating: 4.6, price: "₹5000/month", experience: "10 years" },
  { name: "Transform Wellness", location: "Secunderabad, Hyderabad", category: "Fitness", service: "Weight Loss Program", rating: 4.5, price: "₹4500/month", experience: "8 years" },
  { name: "LeanLife Centre", location: "Warangal, Telangana", category: "Fitness", service: "Weight Loss Program", rating: 4.4, price: "₹3500/month", experience: "6 years" },
  { name: "FitMind Studio", location: "Karimnagar, Telangana", category: "Fitness", service: "Weight Loss Program", rating: 4.3, price: "₹3000/month", experience: "5 years" },

  { name: "EliteFit Trainers", location: "Banjara Hills, Hyderabad", category: "Fitness", service: "Personal Trainer", rating: 4.9, price: "₹12000/month", experience: "15 years" },
  { name: "ProFit Coach", location: "Jubilee Hills, Hyderabad", category: "Fitness", service: "Personal Trainer", rating: 4.8, price: "₹10000/month", experience: "12 years" },
  { name: "BodyMaster PT", location: "Gachibowli, Hyderabad", category: "Fitness", service: "Personal Trainer", rating: 4.7, price: "₹9000/month", experience: "10 years" },
  { name: "FitPro Studio", location: "Kondapur, Hyderabad", category: "Fitness", service: "Personal Trainer", rating: 4.6, price: "₹8000/month", experience: "8 years" },
  { name: "CoachZone", location: "Secunderabad, Hyderabad", category: "Fitness", service: "Personal Trainer", rating: 4.5, price: "₹7000/month", experience: "6 years" },
  { name: "AthletePro", location: "Warangal, Telangana", category: "Fitness", service: "Personal Trainer", rating: 4.4, price: "₹6000/month", experience: "5 years" },

  // ── HOME SERVICES ──────────────────────────────────────
  { name: "Spark Electricals", location: "Banjara Hills, Hyderabad", category: "Home Services", service: "Electrician", rating: 4.8, price: "₹800/visit", experience: "15 years" },
  { name: "PowerFix Services", location: "Gachibowli, Hyderabad", category: "Home Services", service: "Electrician", rating: 4.7, price: "₹700/visit", experience: "12 years" },
  { name: "Bright Wire Co.", location: "Kondapur, Hyderabad", category: "Home Services", service: "Electrician", rating: 4.6, price: "₹750/visit", experience: "10 years" },
  { name: "QuickFix Electric", location: "Secunderabad, Hyderabad", category: "Home Services", service: "Electrician", rating: 4.5, price: "₹600/visit", experience: "8 years" },
  { name: "HomeVolt Services", location: "Warangal, Telangana", category: "Home Services", service: "Electrician", rating: 4.4, price: "₹650/visit", experience: "7 years" },
  { name: "SafeWire Electricals", location: "Karimnagar, Telangana", category: "Home Services", service: "Electrician", rating: 4.3, price: "₹500/visit", experience: "5 years" },
  { name: "Circuit Pro", location: "Nizamabad, Telangana", category: "Home Services", service: "Electrician", rating: 4.6, price: "₹850/visit", experience: "9 years" },

  { name: "AquaFix Plumbing", location: "Banjara Hills, Hyderabad", category: "Home Services", service: "Plumber", rating: 4.8, price: "₹900/visit", experience: "15 years" },
  { name: "PipePro Services", location: "Gachibowli, Hyderabad", category: "Home Services", service: "Plumber", rating: 4.7, price: "₹800/visit", experience: "12 years" },
  { name: "FlowFix Plumbers", location: "Kondapur, Hyderabad", category: "Home Services", service: "Plumber", rating: 4.6, price: "₹750/visit", experience: "10 years" },
  { name: "DrainMaster", location: "Secunderabad, Hyderabad", category: "Home Services", service: "Plumber", rating: 4.5, price: "₹700/visit", experience: "8 years" },
  { name: "TapFix Services", location: "Warangal, Telangana", category: "Home Services", service: "Plumber", rating: 4.4, price: "₹600/visit", experience: "6 years" },
  { name: "WaterWorks Co.", location: "Karimnagar, Telangana", category: "Home Services", service: "Plumber", rating: 4.3, price: "₹550/visit", experience: "5 years" },

  { name: "UrbanClap Cleaning", location: "Banjara Hills, Hyderabad", category: "Home Services", service: "Cleaning Service", rating: 4.9, price: "₹2500/session", experience: "10 years" },
  { name: "HomeShine Services", location: "Jubilee Hills, Hyderabad", category: "Home Services", service: "Cleaning Service", rating: 4.7, price: "₹2000/session", experience: "8 years" },
  { name: "SparkClean Pro", location: "Gachibowli, Hyderabad", category: "Home Services", service: "Cleaning Service", rating: 4.8, price: "₹2200/session", experience: "9 years" },
  { name: "CleanSweep Co.", location: "Kondapur, Hyderabad", category: "Home Services", service: "Cleaning Service", rating: 4.6, price: "₹1800/session", experience: "7 years" },
  { name: "FreshHome Cleaners", location: "Secunderabad, Hyderabad", category: "Home Services", service: "Cleaning Service", rating: 4.5, price: "₹1500/session", experience: "6 years" },
  { name: "NeatNest Services", location: "Warangal, Telangana", category: "Home Services", service: "Cleaning Service", rating: 4.4, price: "₹1200/session", experience: "5 years" },
  { name: "PureHome Cleaning", location: "Karimnagar, Telangana", category: "Home Services", service: "Cleaning Service", rating: 4.3, price: "₹1000/session", experience: "4 years" },

  { name: "WoodCraft Masters", location: "Banjara Hills, Hyderabad", category: "Home Services", service: "Carpenter", rating: 4.8, price: "₹1500/visit", experience: "20 years" },
  { name: "TimberPro Services", location: "Gachibowli, Hyderabad", category: "Home Services", service: "Carpenter", rating: 4.7, price: "₹1200/visit", experience: "15 years" },
  { name: "FixIt Carpentry", location: "Kondapur, Hyderabad", category: "Home Services", service: "Carpenter", rating: 4.6, price: "₹1000/visit", experience: "12 years" },
  { name: "HomeDecor Carpenter", location: "Secunderabad, Hyderabad", category: "Home Services", service: "Carpenter", rating: 4.5, price: "₹900/visit", experience: "10 years" },
  { name: "SawDust Studios", location: "Warangal, Telangana", category: "Home Services", service: "Carpenter", rating: 4.4, price: "₹800/visit", experience: "8 years" },
  { name: "JoineryPro", location: "Karimnagar, Telangana", category: "Home Services", service: "Carpenter", rating: 4.3, price: "₹700/visit", experience: "6 years" },

  { name: "CoolBreeze AC", location: "Banjara Hills, Hyderabad", category: "Home Services", service: "AC Repair", rating: 4.9, price: "₹1500/visit", experience: "15 years" },
  { name: "FrostFix Services", location: "Jubilee Hills, Hyderabad", category: "Home Services", service: "AC Repair", rating: 4.8, price: "₹1200/visit", experience: "12 years" },
  { name: "ChillPro AC Repair", location: "Gachibowli, Hyderabad", category: "Home Services", service: "AC Repair", rating: 4.7, price: "₹1000/visit", experience: "10 years" },
  { name: "ArcticAir Services", location: "Kondapur, Hyderabad", category: "Home Services", service: "AC Repair", rating: 4.6, price: "₹1100/visit", experience: "8 years" },
  { name: "IceCool Technicians", location: "Secunderabad, Hyderabad", category: "Home Services", service: "AC Repair", rating: 4.5, price: "₹900/visit", experience: "7 years" },
  { name: "CoolTech AC", location: "Warangal, Telangana", category: "Home Services", service: "AC Repair", rating: 4.4, price: "₹800/visit", experience: "5 years" },
  { name: "FreezeFix Pro", location: "Karimnagar, Telangana", category: "Home Services", service: "AC Repair", rating: 4.3, price: "₹750/visit", experience: "4 years" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected!");

    // Clear existing shops
    await Shop.deleteMany({});
    console.log("🗑 Cleared existing shops");

    // Insert all shops
    await Shop.insertMany(shops);
    console.log(`✅ ${shops.length} shops added to MongoDB!`);

    mongoose.connection.close();
    console.log("✅ Done! Database seeded successfully!");
  } catch (error) {
    console.log("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();