import React, { useState } from "react";
import "./Payment.css"; // Yukarıdaki CSS kodlarının bulunduğu dosya
import cardImage from "./card.png"; // Kart resminin yolu

const Payment = ({ cartItems }) => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("username");
    const totalPricesData = JSON.parse(localStorage.getItem("totalPrices"));
    const paymentTotalData =
      JSON.parse(localStorage.getItem("paymentTotal")) || {};

    if (!username || !totalPricesData || !totalPricesData[username]) {
      setErrorMessage("Kullanıcı bilgileri bulunamadı ");
      return;
    }

    const userTotalPrices = parseFloat(totalPricesData[username]) || 0;
    const paymentAmount = parseFloat(paymentInfo.amount);

    if (paymentAmount > userTotalPrices || userTotalPrices === 0) {
      setErrorMessage(
        "Ödenecek tutar bulunmuyor veya ödeme tutarı toplam tutardan fazla."
      );
    } else if (paymentInfo.cardNumber.length !== 16) {
      setErrorMessage("Kart numarası 16 haneden oluşmalıdır.");
    } else if (!isValidExpiryDate(paymentInfo.expiryDate)) {
      setErrorMessage("Geçersiz son kullanma tarihi.");
    } else if (paymentInfo.cvv.length !== 3) {
      setErrorMessage("CVV 3 karakterden oluşmalıdır.");
    } else if (
      !paymentInfo.amount ||
      isNaN(paymentInfo.amount) ||
      parseFloat(paymentInfo.amount) <= 0
    ) {
      setErrorMessage("Geçersiz tutar.");
    } else {
      const newUserTotalPrices = userTotalPrices - paymentAmount;
      totalPricesData[username] = newUserTotalPrices;
      localStorage.setItem("totalPrices", JSON.stringify(totalPricesData));

      paymentTotalData[username] =
        (paymentTotalData[username] || 0) + paymentAmount;
      localStorage.setItem("paymentTotal", JSON.stringify(paymentTotalData));

      console.log("Ödeme yapıldı:", paymentInfo);
      setErrorMessage("");
      setPaymentSuccess(true);
    }
  };

  const isValidExpiryDate = (expiryDate) => {
    const today = new Date();
    const [month, year] = expiryDate.split("/");
    const expiry = new Date(parseInt("20" + year), parseInt(month) - 1, 1);
    return expiry > today;
  };

  const handleExpiryDateChange = (e) => {
    let { value } = e.target;
    if (value.length === 2 && parseInt(value) > 0 && parseInt(value) <= 12) {
      value += "/";
    } else if (value.length === 5) {
      const [month, year] = value.split("/");
      const today = new Date();
      const expiry = new Date(parseInt("20" + year), parseInt(month) - 1, 1);
      if (!(expiry > today)) {
        setErrorMessage("Geçersiz son kullanma tarihi.");
        return;
      }
    }
    setPaymentInfo({
      ...paymentInfo,
      expiryDate: value,
    });
  };

  const handleCardNumberChange = (e) => {
    let { value } = e.target;
    // Sadece rakamları kabul et
    value = value.replace(/\D/g, "");
    // Maksimum 16 hane sınırı
    value = value.slice(0, 16);
    setPaymentInfo({
      ...paymentInfo,
      cardNumber: value,
    });
  };

  const handleCVVChange = (e) => {
    const { value } = e.target;
    if (value.length <= 3) {
      setPaymentInfo({
        ...paymentInfo,
        cvv: value,
      });
    }
  };

  return (
    <div className="payment-form">
      <img src={cardImage} alt="Kart" className="card-image" />
      <h2>Ödeme Sayfası</h2>
      {!paymentSuccess && (
        <div>
          <label htmlFor="amount">Ödeme Tutarı:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={paymentInfo.amount}
            onChange={handleChange}
            required
          />
          {(!paymentInfo.amount ||
            isNaN(paymentInfo.amount) ||
            parseFloat(paymentInfo.amount) <= 0) && (
            <p className="error-message">Geçersiz tutar.</p>
          )}
        </div>
      )}
      {!paymentSuccess && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardNumber">Kart Numarası:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            {paymentInfo.cardNumber.length !== 16 && (
              <p className="error-message">
                Kart numarası 16 haneden oluşmalıdır.
              </p>
            )}
          </div>
          <div>
            <label htmlFor="expiryDate">Son Kullanım Tarihi(MM/YY):</label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={paymentInfo.expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleCVVChange}
              required
            />
            {paymentInfo.cvv.length > 3 && (
              <p className="error-message">CVV 3 karakterden fazla olamaz.</p>
            )}
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">Ödeme yap</button>
        </form>
      )}
      {paymentSuccess && (
        <div>
          <p className="success-message">
            Ödeme başarıyla gerçekleştirildi ! Tutar: {paymentInfo.amount}
          </p>
        </div>
      )}
    </div>
  );
};

export default Payment;
