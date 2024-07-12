import React from "react";
import "./home.css";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function WeHelp() {
  return (
    <Container>
      <Row>
        <Col sm={12} md={7}>
          <div className="we-help-img-container">
            {/* {Array.from({ length: 400 }, (_, index) => (
              <span key={index} className="we-help-img-item"></span>
            ))} */}
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
        <Col sm={12} md={5}>
          <div className="ms-2 text-secondary ">
            <h2 className="text-dark mb-4">We Help You Make Modern Interior Design</h2>
            <p>
              Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quis nisl dapibus
              malesuada. Nullam ac aliquet velit. Aliquam vulputate velit imperdiet dolor tempor
              tristique. Pellentesque habitant morbi tristique senectus et netus et malesuada
            </p>
            <ul className="my-4">
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
              <li>Donec vitae odio quis nisl dapibus malesuada</li>
            </ul>
            <p>
              <Button variant="secondary" className="rounded-pill mb-3" active>
                <span className="mx-2">Explore</span>
              </Button>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
