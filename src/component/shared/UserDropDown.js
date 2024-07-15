import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function UserDropDown() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Dropdown show={isDropdownOpen} onToggle={handleDropdownToggle} className="my-cursor-pointer">
      <Dropdown.Toggle variant="primary" as={CustomToggle}>
        {/* <i className="bi bi-person fs-4 text-white"></i> */}
        <img
          width={30}
          height={30}
          src={`images/avatars/${user.avatar}`}
          className="rounded-circle mt-1"
        ></img>
      </Dropdown.Toggle>
      <Dropdown.Menu className="my-bg-green-2" style={{ width: "256px" }}>
        <div className="ms-3">
          <div className="my-1">Welcome, {user.name}</div>
          {/* <div className="my-1">Info</div> */}
          <hr className="mb-1 mt-2"></hr>
          <div onClick={handleLogout} className="my-1">
            Logout
          </div>
        </div>
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
