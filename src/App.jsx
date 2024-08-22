import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Login from "./Login";
import ChangePasswordForm from "./ChangePasswordForm";
import Admin from "./Admin"; // Admin bileşenini import et
import Payment from "./Payment";
import Cart from "./Cart"; // Cart bileşenini import et
import Siparislerim from "./Siparislerim";
import ContactForm from "./ContactForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [shouldRenderComponents, setShouldRenderComponents] = useState(false);
  const [cart, setCart] = useState([]); // Cart state'ini tanımla

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    setShouldRenderComponents(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        {shouldRenderComponents ? (
          <div className="grid-container">
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar} // OpenSidebar fonksiyonunu Sidebar bileşenine prop olarak geçir
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/change-password"
                element={
                  <div className="form-container">
                    <ChangePasswordForm />
                  </div>
                }
              />
              <Route
                path="/payment"
                element={<Payment cartItems={cart} />} // Ödeme bileşenini buraya ekleyin
              />
              <Route path="/Admin" element={<Admin />} />
              <Route path="/Cart" element={<Cart cartItems={cart} />} />
              <Route
                path="/Siparislerim"
                element={<Siparislerim cartItems={cart} />}
              />
              <Route path="/ContactForm" element={<ContactForm />} />{" "}
            </Routes>
          </div>
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </Router>
  );
}

export default App;
