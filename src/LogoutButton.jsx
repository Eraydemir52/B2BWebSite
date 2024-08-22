// LogoutButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Çıkış işlemlerini gerçekleştir
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    console.log("Çıkış yapıldı ");

    // Çıkış başarılı olduğunda onLogout prop'u aracılığıyla işlemi gerçekleştir
    await onLogout();

    // Ana sayfaya yönlendir
    navigate("/");

    // Sayfayı yenile (sayfa yönlendirme işlemi gerçekleştikten sonra)
    window.location.reload();
  };

  return <button onClick={handleLogout}>Çıkış Yap</button>;
};

export default LogoutButton;
