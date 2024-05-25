"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Modal, Button, Form, Alert, Card } from "react-bootstrap";
import AuthService from "../services/auth.service";
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [successful, setSuccessful] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    try {
      const response = await AuthService.register(username, email, password);
      setMessage(response.data.message);
      console.log("Registration response:", response); // Debug statement
      setSuccessful(true);
    } catch (error: any) {
      const resMessage =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(resMessage);
      setSuccessful(false);
      setMessage(resMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#DCF2F1' }}>
      <Card className="p-4" style={{ width: '400px', backgroundColor: '#7FC7D9', borderColor: '#365486' }}>
        {/* <Card.Img variant="top" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" className="mb-4" /> */}
        <Form onSubmit={handleRegister}>
          {!successful && (
            <div>
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
                <Form.Label htmlFor="email" style={{ color: "#0F1035" }}>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
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

              <Button variant="primary" type="submit" className="w-100" style={{ backgroundColor: "#365486", borderColor: "#365486" }}>
                Register
              </Button>
            </div>
          )}

          {message && (
            <Alert variant={successful ? "success" : "danger"} className="mt-3">
              {message}
            </Alert>
          )}
        </Form>

        <Modal show={successful} onHide={() => setSuccessful(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Registration Successful</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {message}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setSuccessful(false)} style={{ backgroundColor: "#365486", borderColor: "#365486" }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </div>
  );
};

export default Register;
