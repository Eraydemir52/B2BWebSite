import React, { useEffect, useState } from "react";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [username, setUsername] = useState("");
  const [totalPrice, setTotalPrice] = useState(0); // Toplam fiyat için state ekle

  useEffect(() => {
    // Kullanıcı adını local storage'dan al
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    // Kullanıcı adı varsa, ilgili kullanıcının sepet verilerini local storage'dan al
    if (storedUsername) {
      const userCart = JSON.parse(
        localStorage.getItem(`cart_${storedUsername}`)
      );
      if (userCart) {
        setCartItems(userCart);

        // Toplam fiyatı hesapla
        const total = userCart.reduce(
          (acc, item) => acc + item.quantity * item.price,
          0
        );
        setTotalPrice(total);
      }
    }
  }, []);

  const handleSendOrder = () => {
    // Sipariş verilerini oluştur
    const orderData = {
      cartItems: cartItems,
      username: username,
      orderDate: new Date().toLocaleDateString(),
      totalPrice: totalPrice, // Toplam fiyatı sipariş verilerine ekle
    };

    // Siparişi local storage'a kaydet
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Sepeti temizle
    setCartItems([]);
    localStorage.removeItem(`cart_${username}`);
    localStorage.removeItem("order_username");

    // Mevcut totalPrices değerini al ve totalPrice değerini ekle
    const totalPrices = JSON.parse(localStorage.getItem("totalPrices")) || {};
    totalPrices[username] = (totalPrices[username] || 0) + totalPrice;
    localStorage.setItem("totalPrices", JSON.stringify(totalPrices));

    // Toplam fiyatı sıfırla
    setTotalPrice(0);

    alert("Sipariş başarıyla gönderildi.");
  };

  return (
    <div className="cart-container">
      <h2>Sepetim</h2>
      <table className="cart-container table">
        <thead>
          <tr>
            <th>Ürün Adı</th>
            <th>Adet</th>
            <th>Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <p>Toplam Fiyat: {totalPrice} TL</p> {/* Toplam fiyatı göster */}
      </div>
      <button onClick={handleSendOrder}>Siparişi Gönder</button>
    </div>
  );
};

export default Cart;
