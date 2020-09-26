import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CategoriesService from "../../services/Categories";
import ProductService from "../../services/Product";
import NewCategoryModal from "../NewCategoryModal";
import "./styles.css";

export default function NewProductModal({
  modalVisible,
  setModalVisible,
  getProducts,
}) {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [newCategoryModalVisible, setNewCategoryModalVisible] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (user) getCategories();
  }, [user]);

  async function getCategories() {
    const response = await CategoriesService.listCateogories(user._id);
    setCategories(response);
  }

  const createProduct = async () => {
    try {
      await ProductService.createProduct(name, price, user._id, categoryId);
      getProducts();
      setModalVisible(false);
    } catch (error) {
      alert("Não foi possível criar seu produto!");
    }
  };

  return (
    <Modal
      isOpen={modalVisible}
      toggle={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <NewCategoryModal
        modalVisible={newCategoryModalVisible}
        setModalVisible={setNewCategoryModalVisible}
        getCategories={getCategories}
      />
      <ModalHeader toggle={() => setModalVisible(!modalVisible)}>
        Adicionar novo produto
      </ModalHeader>
      <ModalBody className="modal-body">
        <input
          placeholder="Nome"
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="Preço"
          onChange={(event) => setPrice(event.target.value)}
        />
        <div className="category-selector">
          <select
            placeholder="Categoria"
            onChange={(event) => setCategoryId(event.target.value)}
          >
            <option value=""> Categoria</option>
            {categories.map((category) => (
              <option value={category._id}>{category.name}</option>
            ))}
          </select>
          <button onClick={() => setNewCategoryModalVisible(true)}>+</button>
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={createProduct}>Adicionar</button>
      </ModalFooter>
    </Modal>
  );
}
