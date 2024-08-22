import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsFillCreditCard2BackFill,
  BsFillBasket2Fill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <BsCart3 className="icon_header" /> B2B
          </Link>
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/">
            <BsGrid1X2Fill className="icon" /> Ana Sayfa
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/cart">
            <BsFillBasket2Fill className="icon" /> Sepet
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/payment">
            <BsFillCreditCard2BackFill className="icon" /> Ödeme
          </Link>
        </li>

        <li className="sidebar-list-item">
          <Link to="/Siparislerim">
            <BsFillGrid3X3GapFill className="icon" /> Siparişler
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/ContactForm">
            <BsPeopleFill className="icon" /> İletişim
          </Link>
        </li>

        {/* <li className="sidebar-list-item">
          <Link to="/reports">
            <BsMenuButtonWideFill className="icon" /> Reports
          </Link>
        </li> */}
        <li className="sidebar-list-item">
          <Link to="/change-password">
            <BsFillGearFill className="icon" /> Ayarlar
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
