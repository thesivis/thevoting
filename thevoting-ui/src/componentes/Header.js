import React, { Component } from "react";

import { Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Link className="navbar-brand" to="/">Home</Link>
        <Nav className="mr-auto">
          <Link className="nav-link" to="/votacao">Votações</Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;



