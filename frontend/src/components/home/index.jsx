import React  from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function Home() {
  return (
    <Container>
    <h1>Home</h1>
    <p>
      <Link to="/login/">Login</Link>
    </p>
    <p>
      <Link to="/register">Register</Link>
    </p>
    <p>
      <Link to="/dashboard">Dashboard</Link>
    </p>
  </Container>
  );
}