import React, { useEffect, useState } from "react";
import MyNavBar from "../shared/MyNavbar";
import { Row, Col, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import WhyChooseUs from "./WhyChooseUs";
import HotProduct from "./HotProduct";

export default function Home() {
  const style = {
    home: {
      backgroundColor: "#3b5d50",
    },
    exploreBtn: { fontWeight: "550", "&:hover": {} },
    section: {
      marginTop: "128px",
      marginBottom: "128px",
    },
  };

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
      <div style={style.section}>
        <HotProduct></HotProduct>
      </div>

      {/* ----- Product end ----- */}

      {/* ----- Why choose Start ----- */}
      <div style={style.section}>
        <WhyChooseUs></WhyChooseUs>
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
