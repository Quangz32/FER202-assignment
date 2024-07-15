import React, { useState } from "react";
import { Container, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MyToast from "../shared/MyToast";
import { addNewUser } from "../../service/UserService";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    if (Object.keys(errors).length === 0) {
      const dataToSend = { ...formData };
      delete dataToSend.confirmPassword;

      const res = await addNewUser(dataToSend);
      console.log(res);

      setToastMessage(res.message);
      setToastVariant(res.success ? "success" : "warning");
      setShowToast(true);

      if (res.success) {
        localStorage.setItem("user", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.email = "Email is not valid";
    }

    if (!data.password.trim()) {
      errors.password = "Password is required";
    }

    if (data.password.length < 6) {
      errors.password = "Password length must be more than 6";
    }
    if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!data.dob.trim()) {
      errors.dob = "Date of birth is required";
    }

    return errors;
  };

  return (
    <>
      <div className="my-bg-green-3">
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
          <h1 className="mb-5">
            Welcome to Qfuni
            <span className=" text-danger">.</span>
          </h1>
          <Row>
            <Col sm={12} md={6} lg={5}>
              <div
                className="my-bg-green-2 rounded-4 d-flex py-5 flex-column justify-content-center 
                                align-items-center  text-white-50 mx-lg-5"
                // style={{ marginTop: "20%" }}
              >
                <h2 className="mb-4 text-white">Register</h2>
                <Form className="mx-5 mx-md-3 mx-lg-1 w-75">
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your name"
                      name="name"
                      value={formData.name}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      isInvalid={!!formErrors.name}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formErrors?.name}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formData.email}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      isInvalid={!!formErrors.email}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formErrors?.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={formData.password}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      isInvalid={!!formErrors.password}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formErrors?.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      isInvalid={!!formErrors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formErrors?.confirmPassword}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date of birth</Form.Label>
                    <FormControl
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={(e) => {
                        handleInputChange(e);
                      }}
                      isInvalid={!!formErrors.dob}
                    ></FormControl>
                    <Form.Control.Feedback type="invalid" className="text-warning">
                      {formErrors?.dob}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="text-center">
                    <Button
                      variant=""
                      className="rounded-pill text-white"
                      style={{ border: "2px solid #A3B2AC" }}
                      onClick={handleSubmit}
                    >
                      <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                        Register
                      </span>
                    </Button>
                  </div>

                  <div className="mt-3">
                    <Link to="/login" className="text-white-50 text-decoration-non">
                      Login now
                    </Link>
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
        message={toastMessage}
        variant={toastVariant}
      ></MyToast>
    </>
  );
}
