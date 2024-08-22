import React, { useEffect, useState } from "react";
import Header from "./Header";
import Modal from "react-modal";
import fordImage from "./ford.png";
import threemImage from "./3m.png";
import hemaImage from "./hema.jpg";
import fourhundredfourImage from "./404.jpg";
import nikenImage from "./Niken.png";
import photonImage from "./photon.png";
import philipsImage from "./philips.png";
import osramImage from "./osram.png";
import boschImage from "./bosch.png";
import inwellsImage from "./inwells.png";
import "./Home.css";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsEye,
} from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aramaInput, setAramaInput] = useState("");
  const [username, setUsername] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [userCount, setUserCount] = useState(0); // New state for user count
  const [paymentTotal, setPaymentTotal] = useState(0); // New state for payment total

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      setUsername("testuser");
    }
  }, []);

  useEffect(() => {
    const savedCart = localStorage.getItem(`cart_${username}`);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [username]);

  useEffect(() => {
    const savedTotalPrices =
      JSON.parse(localStorage.getItem("totalPrices")) || {};
    const userTotalPrice = savedTotalPrices[username] || 0;
    setTotalPrice(userTotalPrice);
  }, [username]);

  useEffect(() => {
    const savedPaymentTotal =
      JSON.parse(localStorage.getItem("paymentTotal")) || {};
    const userPaymentTotal = savedPaymentTotal[username] || 0;
    setPaymentTotal(userPaymentTotal);
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://localhost:44343/api/urun/witurun"
        );
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoryCount = async () => {
      try {
        const response = await fetch("https://localhost:44343/api/kategori");
        const result = await response.json();
        setCategoryCount(result.length); // Update category count
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryCount();
  }, []);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await fetch("https://localhost:44343/api/User");
        const result = await response.json();
        setUserCount(result.length); // Update user count
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserCount();
  }, []);

  const addToCart = (productId) => {
    const productIndex = cart.findIndex((item) => item.id === productId);

    if (productIndex !== -1) {
      const updatedCart = cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
    } else {
      const product = data.find((item) => item.urunID === productId);
      if (product) {
        const newCartItem = {
          id: product.urunID,
          name: product.baslik,
          price: product.fiyat,
          quantity: 1,
        };
        const updatedCart = [...cart, newCartItem];
        setCart(updatedCart);
        localStorage.setItem(`cart_${username}`, JSON.stringify(updatedCart));
      }
    }
  };

  const openModal = (productId) => {
    const product = data.find((item) => item.urunID === productId);
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Calculate adjusted total price
  // const adjustedTotalPrice =
  //   totalPrice - paymentTotal > 0 ? totalPrice - paymentTotal : 0;

  return (
    <main className="main-container">
      <Header
        OpenSidebar={() => {}}
        cartState={cart}
        aramaInput={aramaInput}
        setAramaInput={setAramaInput}
      />
      <div className="main-title">
        <h3>MARKALAR </h3>
      </div>
      <div className="brand-container">
        <div className="brand-marquee">
          <img src={fordImage} alt="Marka Logoları" />
          <img src={threemImage} alt="Marka Logoları" />
          <img src={hemaImage} alt="Marka Logoları" />
          <img src={osramImage} alt="Marka Logoları" />
          <img src={boschImage} alt="Marka Logoları" />
          <img src={philipsImage} alt="Marka Logoları" />
          <img src={photonImage} alt="Marka Logoları" />
          <img src={nikenImage} alt="Marka Logoları" />
          <img src={fourhundredfourImage} alt="Marka Logoları" />
          <img src={inwellsImage} alt="Marka Logoları" />
        </div>
      </div>
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>ÜRÜNLER</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>{data.length}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>KATEGORİLER</h3>
            <BsFillGrid3X3GapFill className="card_icon" />
          </div>
          <h1>{categoryCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>MÜŞTERİLER</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>{userCount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>BAKİYE</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>{totalPrice} TL</h1>
        </div>
      </div>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Başlık</th>
              <th>Marka</th>
              <th>Kategori</th>
              <th>İçerik</th>
              <th>Fiyat</th>
              <th>Durum</th>
              <th>İşlem</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                item.baslik.toLowerCase().includes(aramaInput.toLowerCase())
              )
              .map((item) => (
                <tr key={item.urunID}>
                  {/* <td>{item.urunID}</td> */}
                  <td>{item.baslik}</td>
                  <td>{item.marka}</td>
                  <td>{item.katbaslik}</td>
                  <td>{item.icerik}</td>
                  <td>{item.fiyat}</td>
                  <td>{item.urundurum}</td>
                  <td>
                    <div className="viewProductBtn">
                      <button
                        className="addToCartBtn"
                        onClick={() => addToCart(item.urunID)}
                      >
                        Sepete Ekle
                      </button>
                      <button
                        className="imageBtn"
                        onClick={() => openModal(item.urunID)}
                      >
                        <BsEye size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Ürün Görseli Modal"
        >
          {selectedProduct && (
            <>
              <h3>{selectedProduct.baslik}</h3>
              <img src={selectedProduct.kapakresim} alt="Ürün Görseli" />
            </>
          )}

          <FontAwesomeIcon
            icon={faTimes}
            className="closeButton"
            onClick={closeModal}
          />
        </Modal>
      </div>
    </main>
  );
}

export default Home;
