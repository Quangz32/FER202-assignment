import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserDropDown() {
  //   END STYLE
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <Dropdown show={isDropdownOpen} onToggle={handleDropdownToggle} className="my-cursor-pointer">
      <Dropdown.Toggle variant="primary" as={CustomToggle}>
        {/* <BiPerson className="fs-4 text-white" /> */}
        <i className="bi bi-person fs-4 text-white"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="my-bg-green-2">
        <Dropdown.Item href="#action1">Action 1</Dropdown.Item>
        <Dropdown.Item href="#action2">Action 2</Dropdown.Item>
        <Dropdown.Item href="#action3">Action 3</Dropdown.Item>
        <hr className="my-0"></hr>
        <Dropdown.Item>
          <Link to="/login" className="text-white text-decoration-none">
            Logout
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <span
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </span>
));
