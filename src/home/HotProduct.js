import React, { useState, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HotProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      await axios.get("http://localhost:9999/products").then((res) => {
        // console.log(res);
        setProducts(res.data.slice(0, 3));
      });
    };

    fetchProduct();
  }, []);

  return (
    <Container>
      <Row>
        <Col md={12} lg={3}>
          <h2 className="mb-4">Crafted with excellent material.</h2>
          <p className="mb-4 text-secondary">
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
            velit imperdiet dolor tempor tristique.{" "}
          </p>
          <p>
            <Link to="/shop">
              <Button variant="secondary" className="rounded-pill mb-3" active>
                <span className="mx-2">Explore</span>
              </Button>
            </Link>
          </p>
        </Col>
        {products?.map((product) => (
          <Col key={product.id} row={12} md={4} lg={3} className="mb-5 mb-md-0">
            {/* <div style={{ height: "100px", backgroundColor: "red" }}></div> */}
            <div className="text-center">
              <img className="img-fluid" src={`images/products/${product.image}`}></img>
              <h5>{product.name}</h5>
              <strong className="fs-4">${product.price}</strong>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
