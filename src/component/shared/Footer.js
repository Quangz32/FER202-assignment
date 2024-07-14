import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function Footer() {
  return (
    <Container className="pt-3">
      <Row>
        <Col>
          <p className="text-white-50">
            Copyright ©2024. All Rights Reserved. — Designed with love by Untree.co
            <br></br>Coded by Quangz
          </p>
        </Col>
        <Col className="d-flex justify-content-end text-white">
          <span className="mx-3"> Terms & Conditions</span>
          <span className="mx-3"> Privacy Policy</span>
        </Col>
      </Row>
    </Container>
  );
}
