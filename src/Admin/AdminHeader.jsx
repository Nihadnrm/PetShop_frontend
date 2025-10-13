import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import './adminHeader.css'

function AdminHeader() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/admindash" className="fw-bold text-light">
            Admin Panel
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="admin-navbar-nav" />

          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto gap-3">
              <Link to="/admindash" className="nav-link text-light">Pets</Link>
              <Link to="/adminorders" className="nav-link text-light">Orders</Link>
              <Link to="/admincustomers" className="nav-link text-light">Customers</Link>
              <Link to="/adminappointmentview" className="nav-link text-light">Appointments</Link>
              <Link to="/adminfeedback" className="nav-link text-light">Feedbacks</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminHeader;
