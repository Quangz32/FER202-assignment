import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, Form } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { getAllProduct } from "../../service/ProductService";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProduct();
      setProducts(res);
    };

    fetchProducts();
  }, []);

  // console.log(cart);
  // console.log(searchTerm);
  return (
    <div>
      {/* ------- Hero start --------*/}
      <div className="my-bg-green-1 pb-5">
        <Container className="">
          <Row style={{ padding: "70px 0px" }}>
            <Col sm={12} md={6} lg={8}>
              <h1 className="my-text-white-60">Choose your best Interrior</h1>
            </Col>
            <Col sm={12} md={6} lg={4}>
              <InputGroup className="mb-3 rounded-pill w-75 mt-2 mt-md-0">
                <InputGroup.Text id="basic-addon1">
                  <i className="bi bi-search"></i>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Product List */}
      <div className="my-bg-green-3 pt-5">
        <Container className="min-vh-100">
          <Row>
            {products?.map(
              (product) =>
                product.stock > 0 &&
                product.name?.includes(searchTerm) && (
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
