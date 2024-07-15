import React, { useEffect, useState } from "react";
import { Row, Col, Container, Form, Button, ToastContainer } from "react-bootstrap";
import LoginService from "../../service/LoginService";
import MyToast from "../shared/MyToast";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [formData, setFormData] = useState({ email: "user1@gmail.com", password: "123456" });
  const [formError, setFormError] = useState({});
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    const loginResponse = await LoginService(formData.email, formData.password);

    if (loginResponse) {
      console.log("login success");
      localStorage.setItem("user", JSON.stringify(loginResponse));
      navigate("/home");
    } else {
      setShowToast(true);
    }
    console.log(loginResponse);
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = "Email is not valid";
      }
    }

    if (formData.password === "") {
      errors.password = "Password is required";
    } else {
      if (formData.password.length < 6) {
        errors.password = "Password lenght must more than 6";
      }
    }

    setFormError(errors);

    return Object.keys(errors).length === 0;
  };
  return (
    <>
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
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                      }}
                      isInvalid={!!formError.email}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formError?.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                      }}
                      isInvalid={!!formError.password}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formError?.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant=""
                      className="rounded-pill text-white"
                      style={{ border: "2px solid #A3B2AC" }}
                      onClick={handleSubmit}
                    >
                      <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                        Login
                      </span>
                    </Button>
                  </div>

                  <div className="d-flex  justify-content-around mt-3">
                    <Link to="/register" className="text-white-50 text-decoration-none">
                      Register now
                    </Link>
                    <Link className="text-white-50 text-decoration-none">Forgot password</Link>
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
      <MyToast
        show={showToast}
        setShow={setShowToast}
        message={"Wrong email or password!"}
        variant="warning"
      ></MyToast>
    </>
  );
}
