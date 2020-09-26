import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { useHistory } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import logo from "../../assets/StockLogo.png";
import "./styles.css";
import { AiOutlineLogout } from "react-icons/all";
import ProductService from "../../services/Product";
import NewProductModal from "../../components/NewProductModal";

export default function Home() {
  const history = useHistory();
  const { user, isUserLogged, signout } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);

  useEffect(() => {
    if (!isUserLogged) {
      history.push("/");
    }
  }, [isUserLogged]);

  useEffect(() => {
    if (user) getProducts();
  }, [user]);

  async function getProducts() {
    try {
      const response = await ProductService.listProducts(user._id);
      setProducts(response);
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <div className="home-container">
      <NewProductModal
        modalVisible={newProductModalVisible}
        setModalVisible={setNewProductModalVisible}
        getProducts={getProducts}
      />
      <div className="home-header">
        <img src={logo} alt="logo" width={200} />
        <AiOutlineLogout
          size={50}
          color="#AC1C1C"
          className="logout-icon"
          onClick={signout}
        />
      </div>
      <h2>{`Bem vindo ao seu estoque, ${user?.name}!`}</h2>
      <input className="search-product" placeholder="Buscar um produto" />
      <button
        onClick={() => {
          setNewProductModalVisible(true);
        }}
        className="add-product"
      >
        +
      </button>
      {products.length ? (
        products.map((product, index) => (
          <ProductCard
            product={product}
            getProducts={getProducts}
            productIndex={index}
          />
        ))
      ) : (
        <p>Você ainda não possui produtos em seu estoque.</p>
      )}
    </div>
  );
}
