"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form, Alert, Card } from "react-bootstrap";
import AuthService from "../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await AuthService.login(username, password);
      setMessage("Login successful!");
      console.log("Login response:", response); // Debug statement
      setLoading(false);
    } catch (error: any) {
      console.log("Login error:", error); // Debug statement
      setLoading(false);
      setMessage("incorrect username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DCF2F1' }}>
      <Card className="p-4" style={{ width: '400px', backgroundColor: '#7FC7D9', borderColor: '#365486' }}>
        {/* <Card.Img variant="top" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" className="mb-4" /> */}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="username" style={{ color: "#0F1035" }}>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={onChangeUsername}
              style={{ color: "#0F1035" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" style={{ color: "#0F1035" }}>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={onChangePassword}
              style={{ color: "#0F1035" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: "#365486", borderColor: "#365486" }} disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>

          {message && (
            <Alert variant={message === "Login successful!" ? "success" : "danger"} className="mt-3">
              {message}
            </Alert>
          )}
        </Form>

        <Modal show={message === "Login successful!"} onHide={() => setMessage("")}>
          <Modal.Header closeButton>
            <Modal.Title>Login Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setMessage("")} style={{ backgroundColor: "#365486", borderColor: "#365486" }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default Login;