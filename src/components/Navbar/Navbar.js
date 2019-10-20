import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navbar = () => (
  <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
    <Navbar.Brand>Herolo Weather App</Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        <NavLink to="/" exact className="nav-link">
          Home
        </NavLink>

        <NavLink to="/favorites" exact className="nav-link">
          Favorites
        </NavLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default navbar;
