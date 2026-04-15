import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";                      // ✅ ADD
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Services from "./pages/Services";
import Shops from "./pages/Shops";
import CategoryServices from "./pages/CategoryServices";
import Bookings from "./pages/Bookings";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ Home is now the landing page */}
        <Route path="/" element={<Home />} />

        {/* Login & Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main App */}
        <Route path="/services" element={<Services />} />
        <Route path="/shops" element={<Shops />} />
        <Route path="/category/:categoryName" element={<CategoryServices />} />
        <Route path="/bookings" element={<Bookings />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div style={{ padding: "20px" }}>
              <h1>404 - Page Not Found</h1>
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;