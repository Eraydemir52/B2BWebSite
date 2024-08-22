import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

const companyInfo = {
  phone: "05424416693",
  address:
    "Silahtarağa, Üniversite 1.Sokak No:13, 59860 Çorlu/Tekirdağ T.C. Namık Kemal Üniversitesi Çorlu Mühendislik Fakültesi",
  email: "info@example.com",
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const messageData = {
      adsoyad: formData.name,
      mesajmail: formData.email,
      phonenumber: formData.phone,
      mesajkonu: formData.subject,
      mesajicerik: formData.message,
      mesajdurum: "İnceleniyor",
      mesajtarih: new Date().toISOString(),
    };
    try {
      const response = await axios.post(
        "https://localhost:44343/api/mesaj/addmesaj",
        messageData
      );
      console.log("Form submitted:", response.data);
      localStorage.setItem("formData", JSON.stringify(formData));
      // Clear form after submission
      setFormData({
        name: "",
        subject: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <>
      <div id="contact-form-container">
        <h2>İletişim</h2>
        <form id="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Ad Soyad:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Konu:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Telefon Numarası:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mesaj:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button id="contact-form-button" type="submit">
            Gönder
          </button>
        </form>
      </div>
      <div id="company-info-container">
        <h2>Şirket İletişim Bilgilerimiz</h2>
        <div id="company-info">
          <p>
            <strong>Telefon Numaramız:</strong> {companyInfo.phone}
          </p>
          <p>
            <strong>Adresimiz:</strong> {companyInfo.address}
          </p>
          <p>
            <strong>Email Adresimiz:</strong> {companyInfo.email}
          </p>
        </div>
        <div id="map-container">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1zX0ZYUvscsItrFEZbcs6O8TDZa6Qing&ehbc=2E312F"
            width="640"
            height="480"
            title="Company Location"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
