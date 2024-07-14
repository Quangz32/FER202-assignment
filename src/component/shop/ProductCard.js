import React, { useState } from "react";
import { Col } from "react-bootstrap";
import "./ProductCard.css"; // Import CSS styles
import MyToast from "../shared/MyToast";

export default function ProductCard({ product }) {
  const [showToast, setShowToast] = useState(false);
  const handleAddToCard = () => {
    console.log("Add to card");
    setShowToast(true);
  };
  return (
    <>
      <div className="text-center mb-5 product-card">
        <div className="product-image">
          <img className="img-fluid" src={`images/products/${product.image}`} alt={product.name} />
          <div className="add-to-cart">
            <button onClick={() => handleAddToCard(product)}>Add to Cart</button>
          </div>
        </div>
        <h5>{product.name}</h5>
        <strong className="fs-4">${product.price}</strong>
      </div>

      <MyToast
        show={showToast}
        setShow={setShowToast}
        position="top-right"
        variant="success"
        message={"Product added to Cart"}
      ></MyToast>
    </>
  );
}
