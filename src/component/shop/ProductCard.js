import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./ProductCard.css"; // Import CSS styles
import MyToast from "../shared/MyToast";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../../service/CartService";

export default function ProductCard({ product, user }) {
  const navigate = useNavigate();

  const [showToast, setShowToast] = useState(false);

  const handleAddToCard = (product) => {
    if (!user) {
      navigate("/login");
    }

    console.log("Add to cart");
    setShowToast(true);
  };

  // console.log(user);
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
