import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css"; // CSS dosyasını içe aktar
import Urun from "./Urun"; // Urun bileşenini içe aktar
import SiparisYonetimi from "./SiparisYönetimi";
import MessageList from "./MessageList"; // Import the MessageList component

const Admin = () => {
  const [categoryData, setCategoryData] = useState({
    kategoribaslik: "",
    katsef: "",
    katkeyw: "",
    katdesc: "",
    katdurum: "--- Seçiniz",
  });

  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Seçili kategori ID'si
  const [isOpen, setIsOpen] = useState(false); // Formun açık/kapalı durumunu tutar
  const [isOpenUrun, setIsOpenUrun] = useState(false); // Ürün Formunun açık/kapalı durumu
  const [categories, setCategories] = useState([]); // Kategorileri tutmak için state
  const [isOpenSiparis, setIsOpenSiparis] = useState(false); // Sipariş Yönetimi formunun açık/kapalı durumu
  const [isOpenTalepler, setIsOpenTalepler] = useState(false); // State to control the MessageList component

  useEffect(() => {
    // Component ilk yüklendiğinde ve her categories state'i değiştiğinde çalışır
    fetchCategories();
  }, [categories]); // categories state'inde herhangi bir değişiklik olduğunda useEffect'i tekrar çalıştır

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:44343/api/kategori");
      setCategories(response.data); // API'den gelen kategorileri state'e ata
    } catch (error) {
      console.error("Kategorileri getirirken hata oluştu:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = (categoryId) => {
    const selectedCategory = categories.find(
      (category) => category.kategoriID === categoryId
    );
    if (selectedCategory) {
      setCategoryData({
        kategoribaslik: selectedCategory.kategoribaslik,
        katsef: selectedCategory.katsef,
        katkeyw: selectedCategory.katkeyw,
        katdesc: selectedCategory.katdesc,
        katdurum: selectedCategory.katdurum,
      });
      setSelectedCategoryId(categoryId); // Seçili kategori ID'sini state'e ata
      setIsOpen(true); // Formu aç
    } else {
      console.error("Seçili kategori bulunamadı.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44343/api/kategori/Addkategori",
        categoryData
      );
      console.log(response.data); // Başarı durumunu işle
      setCategoryData({
        kategoribaslik: "",
        katsef: "",
        katkeyw: "",
        katdesc: "",
        katdurum: "--- Seçiniz",
      }); // Formu sıfırla
      setCategories([...categories, response.data]); // Yeni kategoriyi listeye ekle
    } catch (error) {
      console.error("Kategori eklerken hata oluştu:", error); // Hata durumunu işle
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:44343/api/kategori/UpdateKategori",
        {
          kategoriID: selectedCategoryId,
          kategoribaslik: categoryData.kategoribaslik,
          katsef: categoryData.katsef,
          katkeyw: categoryData.katkeyw,
          katdesc: categoryData.katdesc,
          katdurum: categoryData.katdurum,
        }
      );
      console.log(response.data); // Başarı durumunu işle
      setCategoryData({
        kategoribaslik: "",
        katsef: "",
        katkeyw: "",
        katdesc: "",
        katdurum: "--- Seçiniz",
      }); // Formu sıfırla
      setSelectedCategoryId(null); // Seçili kategoriyi sıfırla
      fetchCategories(); // Kategorileri yeniden getir
    } catch (error) {
      console.error("Kategori güncellerken hata oluştu:", error); // Hata durumunu işle
    }
  };

  const toggleForm = () => {
    setIsOpen(!isOpen); // Formun açık/kapalı durumunu tersine çevir
    setIsOpenUrun(false);
    setIsOpenSiparis(false);
    setIsOpenTalepler(false);
  };

  const toggleFormUrun = () => {
    setIsOpenUrun(!isOpenUrun); // Ürün Formunun açık/kapalı durumunu tersine çevir
    setIsOpen(false); // Kategori Formunu kapat
    setIsOpenSiparis(false);
    setIsOpenTalepler(false);
  };

  const toggleFormSiparis = () => {
    setIsOpenSiparis(!isOpenSiparis); // Sipariş Yönetimi formunu aç/kapat
    setIsOpenUrun(false); // Ürün Formunu kapat
    setIsOpen(false); // Kategori Formunu kapat
    setIsOpenTalepler(false);
  };

  const toggleFormTalepler = () => {
    setIsOpenTalepler(!isOpenTalepler); // Talepler formunu aç/kapat
    setIsOpenUrun(false); // Ürün Formunu kapat
    setIsOpen(false); // Kategori Formunu kapat
    setIsOpenSiparis(false);
  };
  const handleClear = () => {
    setCategoryData({
      kategoribaslik: "",
      katsef: "",
      katkeyw: "",
      katdesc: "",
      katdurum: "--- Seçiniz",
    });
  };

  const handleDelete = async (categoryId) => {
    console.log("categoryId:", categoryId);

    if (!categoryId) {
      console.error("Geçersiz categoryId:", categoryId);
      return;
    }

    try {
      const response = await axios.delete(
        `https://localhost:44343/api/kategori/DeleteKategori/${categoryId}`
      );
      console.log(response.data);
      // Başarılı silme işlemiyle ilgili işlemleri gerçekleştirin veya kullanıcı arayüzünü güncelleyin
    } catch (error) {
      console.error("Kategori silinirken hata:", error);
      // Hata durumunu işleyin veya kullanıcıya hata mesajını gösterin
    }
  };

  return (
    <div>
      <div className="button-container">
        <button onClick={toggleForm}>Kategori Yönetimi</button>
        <button onClick={toggleFormUrun}>Ürün Yönetimi</button>
        <button onClick={toggleFormSiparis}>Sipariş Yönetimi</button>
        <button onClick={toggleFormTalepler}>Talepler</button>
      </div>

      <div className="admin-container">
        {isOpenTalepler && <MessageList />}
        {isOpenSiparis && <SiparisYonetimi />}
        {isOpenUrun && <Urun />}
        {isOpen && ( // isOpen true ise formu göster
          <form className="admin-form" onSubmit={handleSubmit}>
            <label htmlFor="kategoribaslik">Kategori Başlık:</label>

            <input
              type="text"
              id="kategoribaslik"
              name="kategoribaslik"
              value={categoryData.kategoribaslik}
              onChange={handleChange}
            />

            <label htmlFor="katsef">SEO Dostu URL:</label>
            <input
              type="text"
              id="katsef"
              name="katsef"
              value={categoryData.katsef}
              onChange={handleChange}
            />

            <label htmlFor="katkeyw">Anahtar Kelimeler:</label>
            <input
              type="text"
              id="katkeyw"
              name="katkeyw"
              value={categoryData.katkeyw}
              onChange={handleChange}
            />

            <label htmlFor="katdesc">Açıklama:</label>
            <textarea
              id="katdesc"
              name="katdesc"
              value={categoryData.katdesc}
              onChange={handleChange}
            ></textarea>

            <label htmlFor="katdurum">Durum:</label>
            <select
              id="katdurum"
              name="katdurum"
              value={categoryData.katdurum}
              onChange={handleChange}
            >
              <option value="">--- Seçiniz</option>
              <option value="Aktif">Aktif</option>
              <option value="Pasif">Pasif</option>
            </select>

            <button type="submit">Kategori Ekle</button>
            <button type="submit" onClick={handleUpdate}>
              Güncelle
            </button>
            <button type="button" onClick={handleClear}>
              Temizle
            </button>
          </form>
        )}
        {isOpen && ( // isOpen true ise tabloyu göster
          <table className="category-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Kategori Başlık</th>
                <th>SEO Dostu URL</th>
                <th>Anahtar Kelimeler</th>
                <th>Açıklama</th>
                <th>Durum</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.kategoriID}</td>
                  <td>{category.kategoribaslik}</td>
                  <td>{category.katsef}</td>
                  <td>{category.katkeyw}</td>
                  <td>{category.katdesc}</td>
                  <td>{category.katdurum}</td>
                  <td>
                    <button onClick={() => handleEdit(category.kategoriID)}>
                      Düzenle
                    </button>
                    <button onClick={() => handleDelete(category.kategoriID)}>
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Admin;
