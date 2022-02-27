import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../../redux/action/userAction";
import FromContainer from "../shared/FromContainer";
import Loader from "../shared/Loader";
import Message from "../shared/Message";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const userRegiser = useSelector((state) => state.userRegiser);
  const { loading, error, userInfo } = userRegiser;
  const history = useNavigate();
  useEffect(() => {
    if (userInfo) {
      history("/");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Confirm password do not match!");
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <>
      <FromContainer>
        <h1> User Register</h1>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        {message && <Message variant="danger">{message}</Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm  password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="mt-3">
            Register
          </Button>
        </Form>
        <Row>
          <Col>
            Have a account? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </FromContainer>
    </>
  );
};

export default Register;
