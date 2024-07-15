import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { changePassword } from "../../service/UserService";
import MyToast from "../shared/MyToast";
import { useNavigate } from "react-router-dom";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.current_password) {
      errors.current_password = "Please enter your current password";
    }

    if (!formData.new_password) {
      errors.new_password = "Please enter your new password";
    }

    if (formData.new_password.length < 6) {
      errors.new_password = "Password length must be more than 6";
    }

    if (formData.new_password !== formData.confirm_new_password) {
      errors.confirm_new_password = "Passwords do not match";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const res = await changePassword(user, formData.current_password, formData.new_password);

    console.log(res);

    setToastMessage(res.message);
    setToastVariant(res.success ? "success" : "warning");
    setShowToast(true);

    if (res.success) {
      localStorage.setItem("user", JSON.stringify(res.data.data));
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    }
  };

  return (
    <>
      <div className="min-vh-100">
        {/* ------- Hero --------*/}
        <div className="my-bg-green-1">
          <Container className="">
            <h1 className="my-text-white-60 mb-0" style={{ padding: "60px 0px" }}>
              Change your password
            </h1>
          </Container>
        </div>

        <div className="mt-5">
          <Container>
            <Row>
              <Col sm={8} md={6} lg={4} className="mx-auto">
                <Form className="my-bg-green-3 p-4 rounded-4" onSubmit={handleSubmit}>
                  <div className="text-center">
                    <span className="fs-3">Change password</span>
                  </div>

                  <Form.Group className="mt-3 mb-3">
                    <Form.Label className="">Current password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your current password"
                      name="current_password"
                      value={formData.current_password}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.current_password}
                    />
                    {formErrors.current_password && (
                      <Form.Control.Feedback type="invalid">
                        {formErrors.current_password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mt-3 mb-3">
                    <Form.Label className="">New password confirm</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter your new password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.new_password}
                    />
                    {formErrors.new_password && (
                      <Form.Control.Feedback type="invalid">
                        {formErrors.new_password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <Form.Group className="mt-3 mb-3">
                    <Form.Label className="">New password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm your new password"
                      name="confirm_new_password"
                      value={formData.confirm_new_password}
                      onChange={handleInputChange}
                      isInvalid={!!formErrors.confirm_new_password}
                    />
                    {formErrors.confirm_new_password && (
                      <Form.Control.Feedback type="invalid">
                        {formErrors.confirm_new_password}
                      </Form.Control.Feedback>
                    )}
                  </Form.Group>

                  <div className="text-center">
                    <Button variant="dark" type="submit" className="rounded-pill">
                      <span className="mx-2">Submit</span>
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
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
