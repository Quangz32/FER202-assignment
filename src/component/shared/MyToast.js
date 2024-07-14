import React from "react";
import { Toast } from "react-bootstrap";

//props: show, setShow, message, variant, position
export default function MyToast(props) {
  const getPosition = () => {
    let res = { top: "100px", left: "100px" }; //default: top-left
    if (props?.position === "top-right") {
      res = { top: "100px", right: "100px" };
    }
    return res;
  };

  return (
    <Toast
      className="position-fixed"
      style={getPosition(props?.position)}
      bg={props.variant ? props.variant : "primary"}
      show={props.show}
      onClose={() => {
        props.setShow(false);
      }}
      autohide={true}
      delay={6000}
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Notification</strong>
        <small>now</small>
      </Toast.Header>
      <Toast.Body className="text-white">
        {props.message}
        <i className="ms-2 bi bi-check-circle"></i>
      </Toast.Body>
    </Toast>
  );
}
