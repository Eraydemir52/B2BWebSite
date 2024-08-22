import React from "react";
import "./CustomModal.css";
import { FaTimes } from "react-icons/fa";
import axios from "axios"; // Import axios for making HTTP requests

const CustomModal = ({ show, onClose, message }) => {
  if (!show) {
    return null;
  }

  const handleConfirm = async () => {
    try {
      // Make a POST request to update the message status
      await axios.post("https://localhost:44343/api/mesaj/UpdateMesaj", {
        mesajID: message.mesajID,
        adsoyad: message.adsoyad,
        mesajmail: message.mesajmail,
        phonenumber: message.phonenumber,
        mesajkonu: message.mesajkonu,
        mesajicerik: message.mesajicerik,
        mesajdurum: "İncelendi",
        mesajtarih: message.mesajtarih,
      });

      // Close the modal after successful update
      onClose();
    } catch (error) {
      console.error("Mesaj durumu güncellenirken hata oluştu:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <FaTimes className="close-icon" onClick={onClose} />
        <div className="modal-header">
          <h2>Mesaj Detayları</h2>
        </div>
        <div className="modal-body">
          <p>
            <strong>Ad Soyad:</strong> {message.adsoyad}
          </p>
          <p>
            <strong>Email:</strong> {message.mesajmail}
          </p>
          <p>
            <strong>Telefon Numarası:</strong> {message.phonenumber}
          </p>
          <p>
            <strong>Konu:</strong> {message.mesajkonu}
          </p>
          <p>
            <strong>Mesaj:</strong> {message.mesajicerik}
          </p>
          <p>
            <strong>Durum:</strong> {message.mesajdurum}
          </p>
          <p>
            <strong>Tarih:</strong>{" "}
            {new Date(message.mesajtarih).toLocaleString()}
          </p>
          <button onClick={handleConfirm}>Onayla</button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
