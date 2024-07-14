import React, { useState, useEffect } from "react";
import { Container, Row, Button, Col, Link } from "react-bootstrap";
import axios from "axios";
import ProductCard from "./ProductCard";
import { getCart, getCartFullInfo } from "../../service/CartService";
import { getAllProduct } from "../../service/ProductService";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProduct();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  // console.log(cart);
  return (
    <div>
      {/* ------- Hero start --------*/}
      <div className="my-bg-green-1 pb-5">
        <Container className="">
          <h1 className="my-text-white-60" style={{ padding: "80px 0px" }}>
            Choose your best Interrior
          </h1>
        </Container>
      </div>

      {/* Product List */}
      <div className="my-bg-green-3 pt-5">
        <Container>
          <Row>
            {products?.map(
              (product) =>
                product.stock > 0 && (
                  <Col key={product.id} row={12} md={4} lg={3} className="mb-5 mb-md-0">
                    <ProductCard product={product} user={user}></ProductCard>
                  </Col>
                )
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
