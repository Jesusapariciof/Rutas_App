import React from 'react';
import * as ReactBootStrap from "react-bootstrap";
import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom";
  

const Nav = () =>{


    return (
      <div className="App">
      <ReactBootStrap.Navbar collapseOnSelect expand="xl" bg="danger" variant="dark">
    <ReactBootStrap.Navbar.Brand href="#home">Rutas App</ReactBootStrap.Navbar.Brand>
    <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <ReactBootStrap.Navbar.Collapse id="responsive-navbar-nav">
      <ReactBootStrap.Nav className="mr-auto"> 
      <Link to="/home">
      <ReactBootStrap.Nav.Link eventKey={2} href="#home">
          Home
        </ReactBootStrap.Nav.Link>
      </Link>
      <Link to="/miperfil">
      <ReactBootStrap.Nav.Link href="#miperfil">Perfil</ReactBootStrap.Nav.Link>
      </Link>
      <Link to="/guide">
      <ReactBootStrap.Nav.Link href="#guide">Guías</ReactBootStrap.Nav.Link>
      </Link>
      </ReactBootStrap.Nav>
      <ReactBootStrap.Nav>
      <Link to="/newplace">
      <ReactBootStrap.Nav.Link href="#newplace">Crear Lugar </ReactBootStrap.Nav.Link>
      </Link>
      
      </ReactBootStrap.Nav>
    </ReactBootStrap.Navbar.Collapse>
  </ReactBootStrap.Navbar>
          </div>
      )
      
    
    

}

export default Nav;
 
