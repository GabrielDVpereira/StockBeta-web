import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CategoriesService from "../../services/Categories";
import ProductService from "../../services/Product";
import NewCategoryModal from "../NewCategoryModal";
import "./styles.css";

export default function EditProductModal({
  modalVisible,
  setModalVisible,
  getProducts,
  product,
}) {
  const { user } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const [newCategoryModalVisible, setNewCategoryModalVisible] = useState(false);

  const [name, setName] = useState(product?.name);
  const [price, setPrice] = useState(product?.price);
  const [categoryId, setCategoryId] = useState(product?.category?._id);

  useEffect(() => {
    if (user) getCategories();
  }, [user]);

  async function getCategories() {
    const response = await CategoriesService.listCateogories(user._id);
    setCategories(response);
  }

  const editProduct = async () => {
    try {
      await ProductService.editProduct(
        name,
        price,
        user._id,
        categoryId,
        product._id
      );
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
        Editar produto
      </ModalHeader>
      <ModalBody className="modal-body">
        {product && (
          <>
            <input
              defaultValue={product?.name}
              placeholder="Nome"
              onChange={(event) => setName(event.target.value)}
            />
            <input
              defaultValue={product?.price}
              placeholder="Preço"
              onChange={(event) => setPrice(event.target.value)}
            />
            <div className="category-selector">
              <select
                defaultValue={product?.category?._id}
                placeholder="Categoria"
                onChange={(event) => setCategoryId(event.target.value)}
              >
                <option value=""> Categoria</option>
                {categories.map((category) => (
                  <option value={category._id}>{category.name}</option>
                ))}
              </select>
              <button onClick={() => setNewCategoryModalVisible(true)}>
                +
              </button>
            </div>
          </>
        )}
      </ModalBody>
      <ModalFooter>
        <button onClick={editProduct}>Editar</button>
      </ModalFooter>
    </Modal>
  );
}
