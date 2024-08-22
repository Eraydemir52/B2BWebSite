import React, { useState } from "react";

function CartMenu({ cartItems }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="cart-menu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="cart-button">Sepet</button>
      {isHovered && (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}TL{" "}
              <span className="cart-quantity">{item.quantity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CartMenu;
