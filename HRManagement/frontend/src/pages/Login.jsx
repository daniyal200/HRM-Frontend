import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Form} from 'react-bootstrap';
import axios from "axios";


const Login = ({ user, setUser }) => {
  const [token, setToken] = useState();
  const navigate = useNavigate()

  return (
    <>
    <div className="navbarr">
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>

    </div>
    <Container id="main-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center p-2 w-100">
        <h1 className="mb-3 fs-3 fw-normal">Sign in !</h1>
        <div className="d-grid">
        <Button
          variant="primary"
          onClick={() => {
            const popup = window.open(
              "http://localhost:5000/auth/microsoft",
              "targetWindow",
              `toolbar=no,
                 location=no,
                 status=no,
                 menubar=no,
                 scrollbars=yes,
                 resizable=yes,
                 width=620,
                 height=700`
            );

            window.addEventListener("message", async(event) => {
              if (event.origin === "http://localhost:5000") {
                if (event.data) {
                  console.log(event.data)
                  popup.close();
                  // localStorage.setItem("user", event.data.id);
                  setToken(event.data.id)
                  setUser(event.data)
                }
                const response = await axios.post("http://localhost:5000/auth/microsoft/login", { name:event.data.displayName,userID:event.data.id})
                localStorage.setItem("user", response.data.token);
                navigate('/dashboard')
              }
            });
          }}
        >
          LOGIN WITH MICROSOFT
        </Button>
        </div>
        <p className="mt-5 text-muted">&copy; 2023-2024</p>
      </Form>
    </Container>
    </>
  );
};

export default Login;
