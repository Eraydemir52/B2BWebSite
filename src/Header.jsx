import React, { useState, useEffect, useRef } from "react";
import {
  BsCart3,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom"; // react-router-dom'dan Link ve useNavigate bileşenlerini içe aktarın
import CartMenu from "./CartMenu";
import LogoutButton from "./LogoutButton";

function Header({ OpenSidebar, cartState, aramaInput, setAramaInput }) {
  const [sepetMenuAcik, setSepetMenuAcik] = useState(false);
  const sepetRef = useRef(null);
  const [inputAcik, setInputAcik] = useState(false);
  const [showAdminButton, setShowAdminButton] = useState(false); // Buttonun görünürlüğünü kontrol etmek için state

  const navigate = useNavigate(); // useNavigate hook'unu kullanarak navigate fonksiyonunu alın

  const cikisYap = async () => {
    // Çıkış işlemleri
  };

  const iconaTikla = () => {
    setInputAcik(!inputAcik);
  };

  const sepetMenuToggle = () => {
    setSepetMenuAcik(!sepetMenuAcik);
  };

  const sepetMenuKapat = (event) => {
    if (sepetRef.current && !sepetRef.current.contains(event.target)) {
      setSepetMenuAcik(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", sepetMenuKapat);
    return () => {
      document.removeEventListener("mousedown", sepetMenuKapat);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const response = await fetch(
          `https://localhost:44343/api/User/${username}`
        );
        const userData = await response.json();

        // Kullanıcının roleID'sine göre buttonun görünürlüğünü ayarla
        setShowAdminButton(userData.roleID === 1);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData(); // fetchData fonksiyonunu çalıştır
  }, []);

  const handleAdminClick = async () => {
    try {
      const username = localStorage.getItem("username");
      const response = await fetch(
        `https://localhost:44343/api/User/${username}`
      );
      const userData = await response.json();

      if (userData.roleID === 1) {
        navigate("/admin"); // Admin sayfasına yönlendirme
      } else {
        alert("Bu işlem için yetkiniz yok!"); // Uyarı verme
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="icon" onClick={iconaTikla}>
        <BsSearch />
      </div>
      {inputAcik && (
        <input
          type="text"
          placeholder="Ürün arama"
          className="inputSearch"
          value={aramaInput}
          onChange={(e) => setAramaInput(e.target.value)}
        />
      )}
      <div className="header-right">
        <div className="header-link">
          <a className="cart-icon-container" onClick={sepetMenuToggle}>
            {cartState && Array.isArray(cartState) && cartState.length > 0 && (
              <span className="cart-count">{cartState.length}</span>
            )}
            <BsCart3 className="icon_header icon-space" />
          </a>
          <a href="#" className="header-link">
            <BsFillEnvelopeFill className="icon icon-space" />
          </a>
          <div className="header-link">
            {/* Link bileşeniyle profil sayfasına yönlendirme */}
            <Link
              to="/change-password"
              style={{
                color: "rgba(255, 255, 255, 0.95)",
                textDecoration: "none",
              }}
            >
              <BsPersonCircle className="icon icon-space" />
            </Link>
            {showAdminButton && (
              <button onClick={handleAdminClick} className="btn-admin">
                Admin
              </button>
            )}
            <div>
              <LogoutButton onLogout={cikisYap} />
            </div>
          </div>
        </div>
        {sepetMenuAcik && (
          <div ref={sepetRef} className="cart-menu">
            <CartMenu
              cartItems={cartState}
              closeCartMenu={() => setSepetMenuAcik(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
