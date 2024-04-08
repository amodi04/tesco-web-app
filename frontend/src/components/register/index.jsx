import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onRegisterClick = useCallback(() => {
    console.log("Register " + username + " " + password);
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
          <Button color="primary" onClick={onRegisterClick}>
            Register
          </Button>
          <p className="mt-2">
            Already have account? <Link to="/login">Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
