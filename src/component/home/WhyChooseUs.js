import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function WhyChooseUs() {
  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          <h2>Why choose us</h2>
          <p className="text-secondary">
            Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam vulputate
            velit imperdiet dolor tempor tristique.
          </p>
          <Row>
            <Col>
              <Row className="mb-3">
                <i className="bi bi-truck fs-3"></i>
                <h6>Fast &amp; Free Shipping</h6>
                <p className="text-secondary">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                  vulputate.
                </p>
              </Row>
              <Row>
                <i className="bi bi-cart-check fs-3"></i>
                <h6>Easy to shop</h6>
                <p className="text-secondary">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                  vulputate.
                </p>
              </Row>
            </Col>
            <Col>
              <Row className="mb-3">
                <i className="bi bi-headset fs-3"></i>
                <h6>24/7 Support</h6>
                <p className="text-secondary">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                  vulputate.
                </p>
              </Row>
              <Row>
                <i className="bi bi-arrow-repeat fs-3"></i>
                <h6>Return easily</h6>
                <p className="text-secondary">
                  Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                  vulputate.
                </p>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col sm={12} md={6} className="px-5 ">
          <img className="img-fluid rounded-5" src="images/why-choose-us-img.jpg"></img>
        </Col>
      </Row>
    </Container>
  );
}
