import React, { useEffect, useState } from "react";
import MyNavBar from "../shared/MyNavbar";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const style = {
    home: {
      backgroundColor: "#3b5d50",
    },
    exploreBtn: { fontWeight: "550", "&:hover": {} },
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      await axios.get("http://localhost:9999/products").then((res) => {
        // console.log(res);
        setProducts(res.data);
      });
    };

    fetchProduct();
  }, []);

  console.log(products);
  return (
    <div>
      {/* ------- Hero start --------*/}
      <div style={style.home}>
        <Container>
          <Row className="d-flex align-items-center">
            <Col lg={5}>
              <h1 className="text-white fw-bold">
                MODERN FURNITURE <span className="d-block">DESIGN STUDIO</span>
              </h1>
              <p className="text-white-50 my-4">
                Welcome to Modern Furniture Design Studio! We specialize in creating stunning and
                functional living spaces that blend modern style with comfort. Let us bring your
                vision to life and transform your home into a truly exceptional space.
              </p>
              <p>
                <Link to="/shop" className="me-2">
                  <Button variant="warning" className="rounded-pill me-2 ">
                    <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                      Shop now
                    </span>
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button
                    variant=""
                    className="rounded-pill text-white"
                    style={{ border: "2px solid #A3B2AC" }}
                  >
                    <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                      Explore
                    </span>
                  </Button>
                </Link>
              </p>
            </Col>
            <Col lg={7}>
              <img src="/images/couch.png"></img>
            </Col>
          </Row>
        </Container>
      </div>
      {/* ------- Hero End --------*/}

      {/* ----- Product Start ----- */}
      <div className="mt-5">
        <Container>
          <Row>
            <Col md={12} lg={3}>
              <h2 className="mb-4">Crafted with excellent material.</h2>
              <p className="mb-4 text-secondary">
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique.{" "}
              </p>
              <p>
                <Button variant="secondary" className="rounded-pill mb-3" active>
                  <span className="mx-2">Explore</span>
                </Button>
              </p>
            </Col>
            {products?.map((product) => (
              <Col key={product.id} row={12} md={4} lg={3} className="mb-5 mb-md-0">
                {/* <div style={{ height: "100px", backgroundColor: "red" }}></div> */}
                <div className="text-center">
                  <img className="img-fluid" src={`images/${product.image}`}></img>
                  <h5>{product.name}</h5>
                  <strong className="fs-4">${product.price}</strong>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
      {/* ----- Product end ----- */}

      {/* ----- Why choose Start ----- */}
      <div>
        <Container>
          <Row>
            <Col sm={12} md={6}>
              <h2>Why choose us</h2>
              <p>
                Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                vulputate velit imperdiet dolor tempor tristique.
              </p>
            </Col>
            <Col sm={12} md={6}></Col>
          </Row>
        </Container>
      </div>
      {/* ----- Why choose end ----- */}

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}
