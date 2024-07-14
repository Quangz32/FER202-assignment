import React from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

export default function Login() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <div className="we-help-img-container h-75">
            <div className="we-help-img-item-1">
              <img src={`images/wehelp/img-grid-1.jpg`} className="img-fluid rounded-4"></img>
            </div>
            <div className="we-help-img-item-2 ps-2">
              <img src={`images/wehelp/img-grid-2.jpg`} className="img-fluid rounded-4"></img>
            </div>
            <div className="we-help-img-item-3">
              <img src={`images/wehelp/img-grid-3.jpg`} className="img-fluid rounded-4"></img>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
