import React, { useState, useEffect } from "react";
import "./SiparisYonetimi.css";

const SiparisYonetimi = () => {
  const [orders, setOrders] = useState([]);
  const [totalPrices, setTotalPrices] = useState({});

  useEffect(() => {
    const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(ordersData);

    const totalPriceData =
      JSON.parse(localStorage.getItem("totalPrices")) || {};
    setTotalPrices(totalPriceData);
  }, []);

  return (
    <div>
      <h1>Sipariş Yönetimi</h1>
      <table id="siparis-table">
        <thead>
          <tr>
            <th>Sipariş ID</th>
            <th>Ürün Adı</th>
            <th>Miktar</th>
            <th>Fiyat</th>
            <th>Toplam Fiyat</th>
            <th>Sipariş Tarihi</th>
            <th>Kullanıcı Adı</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) =>
            order.cartItems.map((item, itemIndex) => (
              <tr key={index + "-" + itemIndex}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td>{order.orderDate}</td>
                <td>{order.username}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Her kullanıcı için toplam fiyatları göster */}
      <div>
        {Object.keys(totalPrices).map((username, index) => (
          <p key={index}>
            Sipariş Tutarı ({username}): {totalPrices[username]} TL
          </p>
        ))}
      </div>
    </div>
  );
};

export default SiparisYonetimi;
