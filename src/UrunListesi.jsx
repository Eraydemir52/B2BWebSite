import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UrunListesi.css";

const handleDelete = async (urunID) => {
  console.log("urunID:", urunID);

  if (!urunID) {
    console.error("Geçersiz categoryId:", urunID);
    return;
  }

  try {
    const response = await axios.delete(
      `https://localhost:44343/api/Urun/DeleteUrun/${urunID}`
    );
    console.log(response.data);
    // Başarılı silme işlemiyle ilgili işlemleri gerçekleştirin veya kullanıcı arayüzünü güncelleyin
  } catch (error) {
    console.error("Ürün silinirken hata:", error);
    // Hata durumunu işleyin veya kullanıcıya hata mesajını gösterin
  }
};

const handleEdit = (urun) => {
  localStorage.setItem("selectedUrun", JSON.stringify(urun));
  console.log("Ürün bilgileri localStorage'a kaydedildi:", urun);
  // Düzenleme formuna yönlendirme kodunu burada ekleyebilirsiniz
};

const UrunListesi = ({ urunler }) => {
  return (
    <table id="urunler-table">
      <thead>
        <tr>
          <th>Ürün ID</th>
          <th>Kategori</th>
          <th>Başlık</th>
          <th>Özellik</th>
          <th>İçerik</th>
          {/* <th>Kapak Resim</th>
          <th>Banner Resim</th> */}
          <th>Fiyat</th>
          <th>Ürün Kodu</th>
          <th>Ürün Stok</th>
          {/* <th>Admin Koyw</th>
          <th>Admin Key Desc</th> */}
          <th>Ürün Tarihi</th>
          <th>Ürün Ekleyen</th>
          <th>Ürün Durum</th>
          <th>Üretici ID</th>
          <th>Resim Ürün</th>
          <th>Resim ID</th>
          <th>İşlemler</th>
        </tr>
      </thead>
      <tbody>
        {urunler.map((urun) => (
          <tr key={urun.urunID}>
            <td>{urun.urunID}</td>
            <td>{urun.kategoriBaslik}</td>
            <td>{urun.baslik}</td>
            <td>{urun.ozellik}</td>
            <td>{urun.icerik}</td>
            {/* <td>{urun.kapakresim}</td>
            <td>{urun.bannerResim}</td> */}
            <td>{urun.fiyat}</td>
            <td>{urun.urunkodu}</td>
            <td>{urun.urunstok}</td>
            {/* <td>{urun.adminKoyw}</td>
            <td>{urun.adminKeyDesc}</td> */}
            <td>{urun.uruntarihi}</td>
            <td>{urun.urunekleyen}</td>
            <td>{urun.urundurum}</td>
            <td>{urun.ureticiID}</td>
            <td>{urun.resimUrun}</td>
            <td>{urun.resimID}</td>
            <td>
              <button onClick={() => handleEdit(urun)}>Düzenle</button>
              <button
                onClick={() => handleDelete(urun.urunID)}
                style={{
                  marginTop: "1px",
                }}
              >
                Sil
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UrunListesiSayfasi = () => {
  const [urunler, setUrunler] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:44343/api/Urun/witurun")
      .then((response) => {
        setUrunler(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Ürün Listesi</h1>
      <UrunListesi urunler={urunler} />
    </div>
  );
};

export default UrunListesiSayfasi;
