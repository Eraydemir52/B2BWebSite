import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //Eray
  const handleLogin = async () => {
    try {
      const response = await fetch("https://localhost:44343/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();

        // Başarılı giriş durumunda oturum bilgilerini LocalStorage'a kaydet
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        // Giriş başarılı olduğunda onLoginSuccess prop'u aracılığıyla işlemi gerçekleştir
        onLoginSuccess();
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing your request");
    }
  };

  useEffect(() => {
    // Sayfa yüklendiğinde oturum bilgilerini kontrol et
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      // Kullanıcı oturumda ise, oturum durumunu sürdür
      onLoginSuccess();
    }
  }, [onLoginSuccess]);

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
