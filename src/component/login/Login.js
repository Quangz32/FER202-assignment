import React from "react";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

export default function Login() {
  return (
    <div className="my-bg-green-3">
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-4">
          Welcome to Qfuni
          <span className=" text-danger">.</span>
        </h1>
        <Row>
          <Col sm={12} md={6} lg={5}>
            <div
              className="my-bg-green-2 rounded-4 d-flex py-5 flex-column justify-content-center 
      align-items-center  text-white-50 mx-lg-5"
              style={{ marginTop: "20%" }}
            >
              <h2 className="mb-4 text-white">Login</h2>
              <Form className="mx-5 mx-md-3 mx-lg-1 w-75">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant=""
                    className="rounded-pill text-white"
                    style={{ border: "2px solid #A3B2AC" }}
                  >
                    <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                      Login
                    </span>
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col className="d-none d-md-block">
            <div className="d-flex align-items-center h-100">
              <div className="we-help-img-container">
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
