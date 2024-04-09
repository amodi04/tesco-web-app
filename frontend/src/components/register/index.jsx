import { React, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Row, Col, Form, FormControl } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUser } from "../../contexts/userContext";

export default function Register() {

  const {register} = useUser();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onRegisterClick = useCallback(async (e) => {
    e.preventDefault();

    const userData = { username: username, password: password };
    const result = await register(userData);
    if (result === true) {
      toast.success("Account for " + userData.username + " created successfully. Please login.");
      return;
    } 
    if (result.response.data.username) {
      setUsernameError(result.response.data.username);
    }
    if (result.response.data.password) {
      setPasswordError(result.response.data.password);
    }
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
                isInvalid={usernameError}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameError('');
                }}
              />
              <FormControl.Feedback type="invalid">{usernameError}</FormControl.Feedback>
            </Form.Group>

            <Form.Group controlId="passwordId">
              <Form.Label>Your password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                isInvalid={passwordError}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}              />
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
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
