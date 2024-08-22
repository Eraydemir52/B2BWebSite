import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MessageList.css";
import CustomModal from "./CustomModal"; // Custom modal bileşenini içe aktarın

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null); // Seçilen mesajı tutmak için state
  const [showModal, setShowModal] = useState(false); // Modal görünürlüğünü kontrol etmek için state

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://localhost:44343/api/mesaj");
        setMessages(response.data);
      } catch (error) {
        console.error("Mesajlar fetch edilirken hata oluştu:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleRowClick = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div id="message-list-container">
      <h2>Gelen Mesajlar</h2>
      <table id="message-list">
        <thead>
          <tr>
            <th>Ad Soyad</th>
            <th>Email</th>
            <th>Telefon Numarası</th>
            <th>Konu</th>
            <th>Mesaj</th>
            <th>Durum</th>
            <th>Tarih</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.mesajID} onClick={() => handleRowClick(message)}>
              <td>{message.adsoyad}</td>
              <td>{message.mesajmail}</td>
              <td>{message.phonenumber}</td>
              <td>{message.mesajkonu}</td>
              <td>{message.mesajicerik}</td>
              <td>{message.mesajdurum}</td>
              <td>{new Date(message.mesajtarih).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomModal
        show={showModal}
        onClose={handleCloseModal}
        message={selectedMessage}
      />
    </div>
  );
};

export default MessageList;
