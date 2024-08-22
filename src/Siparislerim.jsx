import React, { useState, useEffect } from "react";
import "./SiparisYonetimi.css";

const Siparislerim = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const ordersData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(ordersData);

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      const filtered = ordersData.filter(
        (order) => order.username === storedUsername
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(ordersData);
    }
  }, []);

  // Her kullanıcı için toplam fiyatı hesapla
  const calculateTotalPriceByUsername = (username) => {
    let totalPrice = 0;
    orders.forEach((order) => {
      if (order.username === username) {
        order.cartItems.forEach((item) => {
          totalPrice += item.quantity * item.price;
        });
      }
    });
    return totalPrice;
  };

  useEffect(() => {
    // Tüm kullanıcıların toplam fiyatlarını hesapla ve localStorage'a kaydet
    const totalPrices = {};
    orders.forEach((order) => {
      const username = order.username;
      if (!totalPrices.hasOwnProperty(username)) {
        totalPrices[username] = calculateTotalPriceByUsername(username);
      }
    });
    localStorage.setItem("totalPrices", JSON.stringify(totalPrices));
  }, [orders]);

  const handleDelete = (orderIndex, itemIndex) => {
    alert("Siparişiniz iptal edilecek emin misiiz ?");
    const updatedOrders = orders
      .map((order, oIndex) => {
        if (oIndex === orderIndex) {
          const updatedCartItems = order.cartItems.filter(
            (item, iIndex) => iIndex !== itemIndex
          );
          return { ...order, cartItems: updatedCartItems };
        }
        return order;
      })
      .filter((order) => order.cartItems.length > 0); // Boş olan siparişleri kaldır

    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Filtrelenmiş siparişleri güncelle
    const updatedFilteredOrders = updatedOrders.filter(
      (order) => order.username === username
    );
    setFilteredOrders(updatedFilteredOrders);
  };

  return (
    <div>
      <h1>Siparişlerim</h1>
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
            <th>İşlem</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, orderIndex) =>
            order.cartItems.map((item, itemIndex) => (
              <tr key={orderIndex + "-" + itemIndex}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.quantity * item.price}</td>
                <td>{order.orderDate}</td>
                <td>{order.username}</td>
                <td>
                  <button onClick={() => handleDelete(orderIndex, itemIndex)}>
                    İptal Et
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Kullanıcı için toplam fiyatı göster */}
      {username && (
        <div>
          <p>
            {username}: {calculateTotalPriceByUsername(username)} TL
          </p>
        </div>
      )}
    </div>
  );
};

export default Siparislerim;
