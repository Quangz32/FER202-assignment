import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";

export default function MyNavbar() {
  const style = {
    navBar: {
      backgroundColor: "#3b5d50",
    },
    navBarBrand: {
      fontWeight: "600",
    },
    navLink: {
      textTransform: "capitalize",
    },
    navLinkSelected: {
      textTransform: "capitalize",
      borderBottom: "solid 4px #f9bf29",
    },
  };

  const pages = ["home", "shop", "service", "blog", "contact"];
  const [selectingPage, setSelectingPage] = useState("Home");
  const location = useLocation().pathname;

  return (
    <>
      <Navbar expand="md" className="" data-bs-theme="dark" style={style.navBar}>
        <Container>
          <Navbar.Brand href="/home" className="fs-3" style={style.navBarBrand}>
            Qfuni<span className="opacity-50">.</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {pages.map((page) => (
                <Nav.Link
                  key={page}
                  href={page}
                  className="mx-md-1 mx-lg-3 my-auto"
                  style={location.endsWith(page) ? style.navLinkSelected : style.navLink}
                >
                  {page}
                </Nav.Link>
              ))}
              {localStorage.getItem("user") ? (
                <>
                  <Nav.Link className="mx-1">
                    <UserDropDown></UserDropDown>
                  </Nav.Link>
                  <Nav.Link href="/cart" className="mx-lg-2 ">
                    <i className="bi bi-cart fs-4 fw-bold text-white"></i>
                  </Nav.Link>
                </>
              ) : (
                <></>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
