import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = useCallback(() => {
    console.log("Login " + username + " " + password);
  }
    , [username, password]);

  return (
    <Container>
      <Row>
        <Col md="4">
          <h1>Register</h1>
          <Form>
            <Form.Group controlId="usernameId">
              <Form.Label>User name</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Enter user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FormControl.Feedback type="invalid"></FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="passwordId">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid"></Form.Control.Feedback>
            </Form.Group>
          </Form>
          <Button color="primary" onClick={onLoginClick}>
            Login
          </Button>
          <p className="mt-2">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
