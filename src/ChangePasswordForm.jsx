import React, { useState, useEffect } from "react";

function ChangePasswordForm({ onClose }) {
  const [newPassword, setNewPassword] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        if (storedUsername) {
          const response = await fetch(
            `https://localhost:44343/api/User/${storedUsername}`
          );
          const data = await response.json();
          if (data) {
            setUserData(data);
          }
        }
      } catch (error) {
        console.error("Kullanıcı verileri alınırken hata oluştu:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://localhost:44343/api/User/Update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          password: newPassword,
          phonenumber: userData.phonenumber,
          address: userData.address,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
      onClose();
    } catch (error) {
      console.error("Şifre güncellenirken hata oluştu:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Kullanıcı Adı:
        <input
          type="text"
          value={userData ? userData.username : ""}
          disabled={true} // Kullanıcı adı alanını devre dışı bırak
        />
      </label>
      <label>
        E-Mail :
        <input
          type="text"
          value={userData ? userData.email : ""}
          disabled={true} // Telefon numarası alanını devre dışı bırak
        />
      </label>
      <label>
        Telefon Numarası:
        <input
          type="text"
          value={userData ? userData.phonenumber : ""}
          disabled={true} // Telefon numarası alanını devre dışı bırak
        />
      </label>

      <label>
        Adres:
        <input
          type="text"
          value={userData ? userData.address : ""}
          disabled={true} // Adres alanını devre dışı bırak
        />
      </label>
      <label>
        Yeni Şifre:
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <button type="submit" className="buttonpassword">
        Şifreyi Güncelle
      </button>
    </form>
  );
}

export default ChangePasswordForm;
