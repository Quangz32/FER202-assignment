import React, { useEffect, useState } from "react";
import { Container, Form, FormControl, Button, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser, updateUser } from "../../service/UserService";

export default function Profile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dob: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setFormData({
      name: user.name,
      email: user.email,
      dob: user.dob,
    });
  }, []);

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
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // const user = JSON.parse(localStorage.getItem("user"));
    const dataToSend = { ...formData };
    const res = await updateUser(dataToSend);
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

    if (!data.dob.trim()) {
      errors.dob = "Date of birth is required";
    }

    return errors;
  };

  console.log(formData);
  return (
    <>
      <div className="min-vh-100">
        {/* ------- Hero --------*/}
        <div className="my-bg-green-1">
          <Container className="">
            <h1 className="my-text-white-60 mb-0" style={{ padding: "60px 0px" }}>
              Update your profile
            </h1>
          </Container>
        </div>

        <div className="mt-5">
          <Container>
            <Row>
              <Col sm={8} md={6} lg={4} className="mx-auto">
                <Form className="my-bg-green-3 p-5 rounded-4">
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
                      variant="dark"
                      className="rounded-pill text-white"
                      style={{ border: "2px solid #A3B2AC" }}
                      onClick={handleSubmit}
                    >
                      <span className="mx-3 py-2" style={{ fontWeight: "550" }}>
                        Update
                      </span>
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}
