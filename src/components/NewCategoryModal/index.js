import React, { useContext, useState } from "react";
import { AuthContext } from "../../store/contexts/authContext";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CategoriesService from "../../services/Categories";

import "./styles.css";

export default function NewProductModal({
  modalVisible,
  setModalVisible,
  getCategories,
}) {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createNewCategory = async () => {
    try {
      await CategoriesService.createCategory(name, description, user._id);
      getCategories();
      setModalVisible(false);
    } catch (error) {
      alert("Não foi possível criar a categoria");
    }
  };
  return (
    <Modal
      isOpen={modalVisible}
      toggle={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ModalHeader toggle={() => setModalVisible(!modalVisible)}>
        Adicionar nova categoria
      </ModalHeader>
      <ModalBody className="modal-body">
        <input
          onChange={(event) => setName(event.target.value)}
          placeholder="Nome"
        />
        <input
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Descrição"
        />
      </ModalBody>
      <ModalFooter>
        <button onClick={createNewCategory}>Adicionar</button>
      </ModalFooter>
    </Modal>
  );
}
