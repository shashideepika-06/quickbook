import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Shops.css";
import bg from "./../assets/home.png";

const shopsData = {
  // ── HOSPITAL ──────────────────────────────────────────
  "General Checkup": [
    { id: 1, name: "Apollo Clinic", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹800", experience: "15 years" },
    { id: 2, name: "Yashoda Hospital", location: "Secunderabad, Hyderabad", rating: 4.6, price: "₹600", experience: "12 years" },
    { id: 3, name: "KIMS Hospital", location: "Kondapur, Hyderabad", rating: 4.7, price: "₹750", experience: "20 years" },
    { id: 4, name: "Citizens Hospital", location: "Narsingi, Hyderabad", rating: 4.5, price: "₹500", experience: "10 years" },
    { id: 5, name: "Care Hospital", location: "Gachibowli, Hyderabad", rating: 4.4, price: "₹650", experience: "8 years" },
    { id: 6, name: "Medicover Hospital", location: "Warangal, Telangana", rating: 4.3, price: "₹550", experience: "9 years" },
  ],
  "Dental Checkup": [
    { id: 1, name: "Smile Dental Clinic", location: "Jubilee Hills, Hyderabad", rating: 4.9, price: "₹1200", experience: "14 years" },
    { id: 2, name: "Dental World", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹1000", experience: "11 years" },
    { id: 3, name: "Pearl Dental Studio", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹900", experience: "9 years" },
    { id: 4, name: "32 Pearls Dentistry", location: "Banjara Hills, Hyderabad", rating: 4.5, price: "₹1500", experience: "13 years" },
    { id: 5, name: "BrightSmile Clinic", location: "Warangal, Telangana", rating: 4.4, price: "₹800", experience: "7 years" },
    { id: 6, name: "Tooth Care Centre", location: "Karimnagar, Telangana", rating: 4.3, price: "₹950", experience: "6 years" },
  ],
  "Eye Checkup": [
    { id: 1, name: "LV Prasad Eye Institute", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹1000", experience: "25 years" },
    { id: 2, name: "Maxivision Eye Hospital", location: "Secunderabad, Hyderabad", rating: 4.8, price: "₹800", experience: "18 years" },
    { id: 3, name: "Sarada Eye Clinic", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹700", experience: "10 years" },
    { id: 4, name: "Eye Care Centre", location: "Gachibowli, Hyderabad", rating: 4.5, price: "₹600", experience: "8 years" },
    { id: 5, name: "Vision Plus", location: "Warangal, Telangana", rating: 4.4, price: "₹750", experience: "7 years" },
    { id: 6, name: "Lotus Eye Hospital", location: "Karimnagar, Telangana", rating: 4.7, price: "₹900", experience: "12 years" },
  ],
  "Blood Test": [
    { id: 1, name: "SRL Diagnostics", location: "Ameerpet, Hyderabad", rating: 4.8, price: "₹600", experience: "16 years" },
    { id: 2, name: "Thyrocare Lab", location: "Kondapur, Hyderabad", rating: 4.7, price: "₹500", experience: "14 years" },
    { id: 3, name: "Dr. Lal PathLabs", location: "Banjara Hills, Hyderabad", rating: 4.6, price: "₹650", experience: "12 years" },
    { id: 4, name: "Metropolis Lab", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹550", experience: "10 years" },
    { id: 5, name: "Apollo Diagnostics", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹700", experience: "15 years" },
    { id: 6, name: "Vijaya Diagnostics", location: "Warangal, Telangana", rating: 4.4, price: "₹480", experience: "9 years" },
  ],
  "Vaccination": [
    { id: 1, name: "Apollo Vaccine Centre", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹1500", experience: "12 years" },
    { id: 2, name: "KIMS Vaccine Clinic", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹1200", experience: "10 years" },
    { id: 3, name: "LifeCare Immunization", location: "Gachibowli, Hyderabad", rating: 4.5, price: "₹1000", experience: "8 years" },
    { id: 4, name: "Shield Health Clinic", location: "Secunderabad, Hyderabad", rating: 4.7, price: "₹1800", experience: "11 years" },
    { id: 5, name: "VaxCare Centre", location: "Warangal, Telangana", rating: 4.4, price: "₹1300", experience: "7 years" },
    { id: 6, name: "Immunity Plus", location: "Karimnagar, Telangana", rating: 4.3, price: "₹1100", experience: "6 years" },
  ],
  // ── SALON ──────────────────────────────────────────────
  "Haircut": [
    { id: 1, name: "Naturals Salon", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹400", experience: "12 years" },
    { id: 2, name: "Lakme Salon", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹600", experience: "15 years" },
    { id: 3, name: "Green Trends", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹350", experience: "10 years" },
    { id: 4, name: "Toni & Guy", location: "Gachibowli, Hyderabad", rating: 4.9, price: "₹1200", experience: "18 years" },
    { id: 5, name: "Style Hub", location: "Secunderabad, Hyderabad", rating: 4.4, price: "₹300", experience: "7 years" },
    { id: 6, name: "Scissors & Comb", location: "Warangal, Telangana", rating: 4.3, price: "₹250", experience: "5 years" },
    { id: 7, name: "Urban Snip", location: "Karimnagar, Telangana", rating: 4.5, price: "₹320", experience: "8 years" },
  ],
  "Hair Colouring": [
    { id: 1, name: "Lakme Colour Studio", location: "Jubilee Hills, Hyderabad", rating: 4.9, price: "₹2500", experience: "15 years" },
    { id: 2, name: "Toni & Guy Colour", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹3500", experience: "18 years" },
    { id: 3, name: "Naturals Colour Bar", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹2000", experience: "12 years" },
    { id: 4, name: "ChromeHair Studio", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹2800", experience: "9 years" },
    { id: 5, name: "Hue & Style", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹1800", experience: "7 years" },
    { id: 6, name: "Colour Me Beautiful", location: "Warangal, Telangana", rating: 4.4, price: "₹1500", experience: "6 years" },
  ],
  "Beard Trim": [
    { id: 1, name: "The Barber Club", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹350", experience: "10 years" },
    { id: 2, name: "Razor Sharp", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹400", experience: "8 years" },
    { id: 3, name: "Gentleman's Grooming", location: "Gachibowli, Hyderabad", rating: 4.9, price: "₹600", experience: "12 years" },
    { id: 4, name: "Classic Cuts", location: "Kondapur, Hyderabad", rating: 4.5, price: "₹280", experience: "6 years" },
    { id: 5, name: "Urban Barber", location: "Secunderabad, Hyderabad", rating: 4.4, price: "₹320", experience: "5 years" },
    { id: 6, name: "Kings Barbershop", location: "Warangal, Telangana", rating: 4.6, price: "₹300", experience: "9 years" },
    { id: 7, name: "Fade Masters", location: "Karimnagar, Telangana", rating: 4.3, price: "₹250", experience: "4 years" },
  ],
  "Hair Spa": [
    { id: 1, name: "Lakme Spa Lounge", location: "Jubilee Hills, Hyderabad", rating: 4.9, price: "₹1800", experience: "15 years" },
    { id: 2, name: "Naturals Hair Spa", location: "Banjara Hills, Hyderabad", rating: 4.7, price: "₹1500", experience: "12 years" },
    { id: 3, name: "Serene Hair Studio", location: "Gachibowli, Hyderabad", rating: 4.6, price: "₹1200", experience: "8 years" },
    { id: 4, name: "Glow & Grow Spa", location: "Kondapur, Hyderabad", rating: 4.5, price: "₹1400", experience: "7 years" },
    { id: 5, name: "HairLux Spa", location: "Secunderabad, Hyderabad", rating: 4.4, price: "₹1100", experience: "6 years" },
    { id: 6, name: "TresseMe Salon", location: "Warangal, Telangana", rating: 4.3, price: "₹1000", experience: "5 years" },
  ],
  "Hair Styling": [
    { id: 1, name: "Toni & Guy Styling", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹2000", experience: "18 years" },
    { id: 2, name: "Lakme Style Studio", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹1800", experience: "15 years" },
    { id: 3, name: "Flaunt Salon", location: "Gachibowli, Hyderabad", rating: 4.6, price: "₹1500", experience: "10 years" },
    { id: 4, name: "Glam Studio", location: "Kondapur, Hyderabad", rating: 4.5, price: "₹1200", experience: "8 years" },
    { id: 5, name: "Curl & Twist", location: "Secunderabad, Hyderabad", rating: 4.4, price: "₹1000", experience: "6 years" },
    { id: 6, name: "Style Icon", location: "Warangal, Telangana", rating: 4.3, price: "₹900", experience: "5 years" },
  ],
  // ── BEAUTY PARLOUR ─────────────────────────────────────
  "Facial": [
    { id: 1, name: "Lakme Beauty Parlour", location: "Jubilee Hills, Hyderabad", rating: 4.9, price: "₹2500", experience: "15 years" },
    { id: 2, name: "Naturals Beauty", location: "Banjara Hills, Hyderabad", rating: 4.7, price: "₹2000", experience: "12 years" },
    { id: 3, name: "Glow Beauty Studio", location: "Gachibowli, Hyderabad", rating: 4.8, price: "₹2800", experience: "10 years" },
    { id: 4, name: "Radiance Parlour", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹2200", experience: "8 years" },
    { id: 5, name: "Blush Beauty", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹1800", experience: "6 years" },
    { id: 6, name: "Femina Studio", location: "Warangal, Telangana", rating: 4.4, price: "₹1500", experience: "7 years" },
    { id: 7, name: "Glamour Zone", location: "Karimnagar, Telangana", rating: 4.3, price: "₹1200", experience: "5 years" },
  ],
  "Makeup": [
    { id: 1, name: "MAC Studio Hyderabad", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹8000", experience: "15 years" },
    { id: 2, name: "Lakme Makeup Studio", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹6000", experience: "12 years" },
    { id: 3, name: "Bridal Bliss", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹15000", experience: "10 years" },
    { id: 4, name: "Face Art Studio", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹7000", experience: "8 years" },
    { id: 5, name: "Glam Squad", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹5000", experience: "6 years" },
    { id: 6, name: "Beauty Craft", location: "Warangal, Telangana", rating: 4.4, price: "₹4000", experience: "5 years" },
  ],
  "Threading": [
    { id: 1, name: "Naturals Parlour", location: "Banjara Hills, Hyderabad", rating: 4.7, price: "₹100", experience: "12 years" },
    { id: 2, name: "Lakme Beauty", location: "Jubilee Hills, Hyderabad", rating: 4.6, price: "₹120", experience: "10 years" },
    { id: 3, name: "Silky Touch Parlour", location: "Gachibowli, Hyderabad", rating: 4.5, price: "₹80", experience: "8 years" },
    { id: 4, name: "Pretty Up Salon", location: "Kondapur, Hyderabad", rating: 4.4, price: "₹90", experience: "6 years" },
    { id: 5, name: "Quick Groom", location: "Secunderabad, Hyderabad", rating: 4.3, price: "₹70", experience: "5 years" },
    { id: 6, name: "Femcare Beauty", location: "Warangal, Telangana", rating: 4.5, price: "₹110", experience: "7 years" },
    { id: 7, name: "Brow Bar", location: "Karimnagar, Telangana", rating: 4.6, price: "₹150", experience: "9 years" },
  ],
  "Waxing": [
    { id: 1, name: "Naturals Wax Studio", location: "Banjara Hills, Hyderabad", rating: 4.7, price: "₹800", experience: "12 years" },
    { id: 2, name: "Lakme Wax Bar", location: "Jubilee Hills, Hyderabad", rating: 4.6, price: "₹1000", experience: "10 years" },
    { id: 3, name: "Smooth Skin Studio", location: "Gachibowli, Hyderabad", rating: 4.8, price: "₹1200", experience: "9 years" },
    { id: 4, name: "Silky Finish", location: "Kondapur, Hyderabad", rating: 4.5, price: "₹700", experience: "7 years" },
    { id: 5, name: "Pure Beauty", location: "Secunderabad, Hyderabad", rating: 4.4, price: "₹900", experience: "6 years" },
    { id: 6, name: "Glow Wax Centre", location: "Warangal, Telangana", rating: 4.3, price: "₹600", experience: "5 years" },
  ],
  "Skin Treatment": [
    { id: 1, name: "Kaya Skin Clinic", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹5000", experience: "18 years" },
    { id: 2, name: "Oliva Skin Clinic", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹4000", experience: "15 years" },
    { id: 3, name: "VLCC Wellness", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹3500", experience: "12 years" },
    { id: 4, name: "SkinCity Clinic", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹4500", experience: "10 years" },
    { id: 5, name: "DermaCare Studio", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹3000", experience: "8 years" },
    { id: 6, name: "ClearSkin Centre", location: "Warangal, Telangana", rating: 4.4, price: "₹2500", experience: "7 years" },
    { id: 7, name: "GlowUp Derma", location: "Karimnagar, Telangana", rating: 4.3, price: "₹2000", experience: "5 years" },
  ],
  // ── FITNESS ────────────────────────────────────────────
  "Yoga Sessions": [
    { id: 1, name: "Isha Yoga Centre", location: "Gachibowli, Hyderabad", rating: 4.9, price: "₹3000/month", experience: "20 years" },
    { id: 2, name: "Art of Living", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹2500/month", experience: "18 years" },
    { id: 3, name: "Yoga Tree Studio", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹2000/month", experience: "10 years" },
    { id: 4, name: "Mind & Body Yoga", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹2200/month", experience: "8 years" },
    { id: 5, name: "Sunrise Yoga", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹1800/month", experience: "7 years" },
    { id: 6, name: "ZenFlow Studio", location: "Warangal, Telangana", rating: 4.4, price: "₹1500/month", experience: "5 years" },
    { id: 7, name: "Bliss Yoga Hub", location: "Karimnagar, Telangana", rating: 4.3, price: "₹1200/month", experience: "4 years" },
  ],
  "Gym Training": [
    { id: 1, name: "Gold's Gym", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹3500/month", experience: "20 years" },
    { id: 2, name: "Fitness First", location: "Gachibowli, Hyderabad", rating: 4.8, price: "₹4500/month", experience: "15 years" },
    { id: 3, name: "Cult.fit Gym", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹4000/month", experience: "10 years" },
    { id: 4, name: "Iron Paradise", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹3000/month", experience: "8 years" },
    { id: 5, name: "PowerHouse Gym", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹2500/month", experience: "7 years" },
    { id: 6, name: "FitZone", location: "Warangal, Telangana", rating: 4.4, price: "₹2000/month", experience: "6 years" },
    { id: 7, name: "BodyCraft Gym", location: "Karimnagar, Telangana", rating: 4.3, price: "₹1800/month", experience: "5 years" },
  ],
  "Zumba Class": [
    { id: 1, name: "Cult.fit Zumba", location: "Gachibowli, Hyderabad", rating: 4.9, price: "₹2500/month", experience: "10 years" },
    { id: 2, name: "DanceZone Studio", location: "Banjara Hills, Hyderabad", rating: 4.7, price: "₹2000/month", experience: "8 years" },
    { id: 3, name: "Rhythmic Fitness", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹2200/month", experience: "9 years" },
    { id: 4, name: "Beat & Burn", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹1800/month", experience: "7 years" },
    { id: 5, name: "Zumba Fiesta", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹1500/month", experience: "6 years" },
    { id: 6, name: "FunFit Studio", location: "Warangal, Telangana", rating: 4.4, price: "₹1200/month", experience: "5 years" },
  ],
  "Weight Loss Program": [
    { id: 1, name: "VLCC Slimming", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹8000/month", experience: "20 years" },
    { id: 2, name: "Naturals Wellness", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹6000/month", experience: "15 years" },
    { id: 3, name: "SlimFit Centre", location: "Gachibowli, Hyderabad", rating: 4.8, price: "₹7000/month", experience: "12 years" },
    { id: 4, name: "BodyGoal Studio", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹5000/month", experience: "10 years" },
    { id: 5, name: "Transform Wellness", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹4500/month", experience: "8 years" },
    { id: 6, name: "LeanLife Centre", location: "Warangal, Telangana", rating: 4.4, price: "₹3500/month", experience: "6 years" },
    { id: 7, name: "FitMind Studio", location: "Karimnagar, Telangana", rating: 4.3, price: "₹3000/month", experience: "5 years" },
  ],
  "Personal Trainer": [
    { id: 1, name: "EliteFit Trainers", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹12000/month", experience: "15 years" },
    { id: 2, name: "ProFit Coach", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹10000/month", experience: "12 years" },
    { id: 3, name: "BodyMaster PT", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹9000/month", experience: "10 years" },
    { id: 4, name: "FitPro Studio", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹8000/month", experience: "8 years" },
    { id: 5, name: "CoachZone", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹7000/month", experience: "6 years" },
    { id: 6, name: "AthletePro", location: "Warangal, Telangana", rating: 4.4, price: "₹6000/month", experience: "5 years" },
  ],
  // ── HOME SERVICES ──────────────────────────────────────
  "Electrician": [
    { id: 1, name: "Spark Electricals", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹800/visit", experience: "15 years" },
    { id: 2, name: "PowerFix Services", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹700/visit", experience: "12 years" },
    { id: 3, name: "Bright Wire Co.", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹750/visit", experience: "10 years" },
    { id: 4, name: "QuickFix Electric", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹600/visit", experience: "8 years" },
    { id: 5, name: "HomeVolt Services", location: "Warangal, Telangana", rating: 4.4, price: "₹650/visit", experience: "7 years" },
    { id: 6, name: "SafeWire Electricals", location: "Karimnagar, Telangana", rating: 4.3, price: "₹500/visit", experience: "5 years" },
    { id: 7, name: "Circuit Pro", location: "Nizamabad, Telangana", rating: 4.6, price: "₹850/visit", experience: "9 years" },
  ],
  "Plumber": [
    { id: 1, name: "AquaFix Plumbing", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹900/visit", experience: "15 years" },
    { id: 2, name: "PipePro Services", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹800/visit", experience: "12 years" },
    { id: 3, name: "FlowFix Plumbers", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹750/visit", experience: "10 years" },
    { id: 4, name: "DrainMaster", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹700/visit", experience: "8 years" },
    { id: 5, name: "TapFix Services", location: "Warangal, Telangana", rating: 4.4, price: "₹600/visit", experience: "6 years" },
    { id: 6, name: "WaterWorks Co.", location: "Karimnagar, Telangana", rating: 4.3, price: "₹550/visit", experience: "5 years" },
  ],
  "Cleaning Service": [
    { id: 1, name: "UrbanClap Cleaning", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹2500/session", experience: "10 years" },
    { id: 2, name: "HomeShine Services", location: "Jubilee Hills, Hyderabad", rating: 4.7, price: "₹2000/session", experience: "8 years" },
    { id: 3, name: "SparkClean Pro", location: "Gachibowli, Hyderabad", rating: 4.8, price: "₹2200/session", experience: "9 years" },
    { id: 4, name: "CleanSweep Co.", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹1800/session", experience: "7 years" },
    { id: 5, name: "FreshHome Cleaners", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹1500/session", experience: "6 years" },
    { id: 6, name: "NeatNest Services", location: "Warangal, Telangana", rating: 4.4, price: "₹1200/session", experience: "5 years" },
    { id: 7, name: "PureHome Cleaning", location: "Karimnagar, Telangana", rating: 4.3, price: "₹1000/session", experience: "4 years" },
  ],
  "Carpenter": [
    { id: 1, name: "WoodCraft Masters", location: "Banjara Hills, Hyderabad", rating: 4.8, price: "₹1500/visit", experience: "20 years" },
    { id: 2, name: "TimberPro Services", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹1200/visit", experience: "15 years" },
    { id: 3, name: "FixIt Carpentry", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹1000/visit", experience: "12 years" },
    { id: 4, name: "HomeDecor Carpenter", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹900/visit", experience: "10 years" },
    { id: 5, name: "SawDust Studios", location: "Warangal, Telangana", rating: 4.4, price: "₹800/visit", experience: "8 years" },
    { id: 6, name: "JoineryPro", location: "Karimnagar, Telangana", rating: 4.3, price: "₹700/visit", experience: "6 years" },
  ],
  "AC Repair": [
    { id: 1, name: "CoolBreeze AC", location: "Banjara Hills, Hyderabad", rating: 4.9, price: "₹1500/visit", experience: "15 years" },
    { id: 2, name: "FrostFix Services", location: "Jubilee Hills, Hyderabad", rating: 4.8, price: "₹1200/visit", experience: "12 years" },
    { id: 3, name: "ChillPro AC Repair", location: "Gachibowli, Hyderabad", rating: 4.7, price: "₹1000/visit", experience: "10 years" },
    { id: 4, name: "ArcticAir Services", location: "Kondapur, Hyderabad", rating: 4.6, price: "₹1100/visit", experience: "8 years" },
    { id: 5, name: "IceCool Technicians", location: "Secunderabad, Hyderabad", rating: 4.5, price: "₹900/visit", experience: "7 years" },
    { id: 6, name: "CoolTech AC", location: "Warangal, Telangana", rating: 4.4, price: "₹800/visit", experience: "5 years" },
    { id: 7, name: "FreezeFix Pro", location: "Karimnagar, Telangana", rating: 4.3, price: "₹750/visit", experience: "4 years" },
  ],
};

// ── SVG Star Rating ──
const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(
        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="gold" stroke="gold" strokeWidth="1" />
        </svg>
      );
    } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
      stars.push(
        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`half-${i}-${rating}`}>
              <stop offset="50%" stopColor="gold" />
              <stop offset="50%" stopColor="#555" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill={`url(#half-${i}-${rating})`} stroke="gold" strokeWidth="1" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} width="18" height="18" viewBox="0 0 24 24">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#555" stroke="#555" strokeWidth="1" />
        </svg>
      );
    }
  }
  return <div className="stars">{stars}</div>;
};

function Shops() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const service = searchParams.get("service") || "";
  const category = searchParams.get("category") || "";
  const shops = shopsData[service] || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM",
    "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM",
  ];

  const today = new Date().toISOString().split("T")[0];

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

  const handleBookNow = (shop) => {
    setSelectedShop(shop);
    setSelectedDate("");
    setSelectedTime("");
    setError("");
    setShowModal(true);
  };

  // ✅ API booking
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      setError("Please select both date and time slot!");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          shopName: selectedShop.name,
          location: selectedShop.location,
          service: service,
          category: category,
          date: selectedDate,
          time: selectedTime,
          price: selectedShop.price,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      setShowModal(false);
      setShowSuccess(true);
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="shops-container"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* TOP BAR */}
      <div className="top-bar">
        <button
          className="back-btn"
          onClick={() => navigate(`/category/${encodeURIComponent(category)}`)}
        >
          ← Back
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* TITLE */}
      <h1 className="title">{service} - Nearby Shops</h1>
      <p className="subtitle">{shops.length} shops available</p>

      {/* SHOPS GRID */}
      <div className="shops-grid">
        {shops.length === 0 ? (
          <p className="no-shops">No shops found for this service.</p>
        ) : (
          shops.map((shop) => (
            <div key={shop.id} className="shop-card">
              <div className="shop-info">
                <h2 className="shop-name">{shop.name}</h2>
                <p className="shop-location">📍 {shop.location}</p>
                <p className="shop-experience">🏆 {shop.experience} experience</p>
                <div className="shop-rating">
                  <StarRating rating={shop.rating} />
                  <span className="rating-num">{shop.rating}</span>
                </div>
                <p className="shop-price">💰 {shop.price}</p>
              </div>
              <button className="book-btn" onClick={() => handleBookNow(shop)}>
                Book Now
              </button>
            </div>
          ))
        )}
      </div>

      {/* BOOKING MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Book Appointment</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>

            <div className="modal-shop-info">
              <p className="modal-shop-name">🏪 {selectedShop?.name}</p>
              <p className="modal-shop-detail">✂️ Service: <strong>{service}</strong></p>
              <p className="modal-shop-detail">📍 {selectedShop?.location}</p>
              <p className="modal-shop-price">💰 {selectedShop?.price}</p>
            </div>

            <hr className="modal-divider" />

            {error && <p className="modal-error">⚠️ {error}</p>}

            <div className="modal-field">
              <label>📅 Select Date</label>
              <input
                type="date"
                min={today}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="date-input"
              />
            </div>

            <div className="modal-field">
              <label>🕐 Select Time Slot</label>
              <div className="time-slots">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    className={`time-slot ${selectedTime === slot ? "selected" : ""}`}
                    onClick={() => setSelectedTime(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              className="confirm-btn"
              onClick={handleConfirmBooking}
              disabled={loading}
            >
              {loading ? "Booking..." : "✅ Confirm Booking"}
            </button>
          </div>
        </div>
      )}

      {/* SUCCESS BOX */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h3 className="success-title">Booking Confirmed!</h3>
            <p className="success-msg">
              Your appointment at <strong>{selectedShop?.name}</strong> has been
              booked for{" "}
              <strong>
                {new Date(selectedDate).toLocaleDateString("en-IN", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </strong>{" "}
              at <strong>{selectedTime}</strong>.
            </p>
            <div className="success-actions">
              <button
                className="view-bookings-btn"
                onClick={() => { setShowSuccess(false); navigate("/bookings"); }}
              >
                📋 View My Bookings
              </button>
              <button
                className="stay-btn"
                onClick={() => setShowSuccess(false)}
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shops;