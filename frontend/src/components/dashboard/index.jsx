import React, { useCallback } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useUser } from "../../contexts/userContext";

export default function Dashboard() {

  const {user, logout} = useUser();

  const onLogout = useCallback(async (e) => {
    e.preventDefault();
    
    await logout();
  }, []);

  return (
    <div>
        <Navbar bg="light">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              User: <b>{user.username}</b>
            </Navbar.Text>
            <Nav.Link onClick={onLogout}>Logout</Nav.Link>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <h1>Dashboard</h1>
        </Container>
      </div>
  );
}
