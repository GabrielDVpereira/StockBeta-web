import React, { useState, useRef } from "react";
import "./styles.css";
import { FaRegEdit } from "react-icons/all";
import { Tooltip } from "reactstrap";
import EditProductModal from "../EditProductModal";
import moment from "moment";

export default function ProductCard({ product, getProducts, productIndex }) {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const [editModalVisible, setEditModalVisible] = useState(false);

  return (
    <div className="product-card">
      <EditProductModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        getProducts={getProducts}
        product={product}
      />
      <div>
        <p>{product.name}</p>
        <p>{moment(product.createdAt).format("DD/MM/YYYY")}</p>
      </div>
      <div className="product-right-info">
        <div className="product-price">
          <p>{`R$ ${product.price}`}</p>
          <p className="product-category" id={`P-${productIndex}`}>
            {product.category.name}
          </p>
          <Tooltip
            placement="bottom"
            isOpen={tooltipOpen}
            target={`P-${productIndex}`}
            toggle={toggle}
          >
            {product.category.description}
          </Tooltip>
        </div>
        <FaRegEdit
          size={30}
          color="#444"
          className="edit-icon"
          onClick={() => setEditModalVisible(true)}
        />
      </div>
    </div>
  );
}
