import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Button,
  Row,
  Col,
  Form,
  FormControl,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/userContext";

export default function Login() {

  const {login} = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLoginClick = useCallback(async (e) => {
    e.preventDefault();

    const userData = { username: username, password: password };
    await login(userData, "/");
  }
    , [username, password, login]);

  return (
    <Container>
      <Row>
        <Col md="4">
          <h1>Login</h1>
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
