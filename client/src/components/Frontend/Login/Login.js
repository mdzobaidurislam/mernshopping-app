import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/action/userAction";
import FromContainer from "../shared/FromContainer";
import Loader from "../shared/Loader";
import Message from "../shared/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const history = useNavigate();
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      history("/admin");
    } else if (userInfo && !userInfo.isAdmin) {
      history("/user/profile");
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <>
      <FromContainer>
        <h1>Login User</h1>

        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
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
          <Button type="submit" variant="primary" className="mt-3">
            Log in
          </Button>
        </Form>
        <Row>
          <Col>
            New Customer? <Link to="/register">Register Account</Link>
          </Col>
        </Row>
      </FromContainer>
    </>
  );
};

export default Login;
