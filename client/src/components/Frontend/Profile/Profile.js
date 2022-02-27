import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getUserDetails,
  userUpdateDetails,
  userUpdatePassword,
} from "../../../redux/action/userAction";
import Loader from "../shared/Loader";
import Message from "../shared/Message";

const Profile = () => {
  const [hide, setHide] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const history = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setPhone(user.phone);
      }
    }
  }, [userInfo, history, user, dispatch]);

  // check password and confirm password
  const checkPasswordHandle = (e) => {
    e.preventDefault();
    console.log("Check Password");
    if (oldPassword === "") {
      setMessage("Old Password not be empty!");
    } else if (password === "") {
      setMessage("Password not be empty!");
    } else if (password !== confirmPassword) {
      setMessage("Confirm password do not match!");
    } else {
      dispatch(userUpdatePassword("profile", password));
      setMessage("User Password Changes Successfully!");
    }
  };

  // updateDetailsHandler

  const updateDetailsHandler = (e) => {
    e.preventDefault();
    dispatch(userUpdateDetails("profile", name, email, phone));
    setMessage("User Updated Successfully!");
  };
  // updateDetailsHandler

  // const userUpdatePassword = (e) => {
  //   e.preventDefault()
  //   dispatch(userUpdatePassword('profile',password))
  //   setMessage("User Password Changes Successfully!")
  // }

  return (
    <>
      <Card>
        {error && <Message variant="danger">{error}</Message>}
        {user && loading ? <Loader /> : ""}
        {message && <Message variant="danger">{message}</Message>}

        <Card.Header className="fw-bold fs-3">My Profile</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4} className="text-center">
              <Image
                src="/images/profile.png"
                className="fluid profile_image "
              />
              <div className="mt-3">
                <Button
                  className="btn btn-danger rounded"
                  onClick={() => (hide ? setHide(false) : setHide(true))}
                >
                  Edit Profile
                </Button>
              </div>
            </Col>
            <Col md={8}>
              {hide ? (
                <div>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem className="text-secondary fw-bold">
                      Student Id:{" "}
                      <span className="text-danger">WEVDEV_5800</span>
                    </ListGroupItem>
                    <ListGroupItem className="text-secondary fw-bold">
                      Full Name: <span className="text-danger">{name}</span>
                    </ListGroupItem>
                    <ListGroupItem className="text-secondary fw-bold">
                      Email Address:{" "}
                      <span className="text-danger">{email}</span>
                    </ListGroupItem>
                    <ListGroupItem className="text-secondary fw-bold">
                      Phone Number: <span className="text-danger">{phone}</span>
                    </ListGroupItem>
                  </ListGroup>
                </div>
              ) : (
                <Form>
                  <Form.Group className="mb-3" controlId="full_name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="rounded-3"
                      placeholder="Enter name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="rounded-3"
                      placeholder="Enter email"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="phone_number">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="rounded-3"
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 text-end">
                    <Button
                      onClick={updateDetailsHandler}
                      className="btn btn-danger rounded-3"
                    >
                      Save changes
                    </Button>
                  </Form.Group>
                  <Row>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="old_password">
                        <Form.Control
                          type="text"
                          onChange={(e) => setOldPassword(e.target.value)}
                          className="rounded-3"
                          placeholder="Enter old password"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="new_password">
                        <Form.Control
                          type="text"
                          className="rounded-3"
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group className="mb-3" controlId="confirm_password">
                        <Form.Control
                          type="text"
                          className="rounded-3"
                          onChange={(e) => setconfirmPassword(e.target.value)}
                          placeholder="Enter confirm password"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3 text-end">
                        <Button
                          disabled={oldPassword.length === 0}
                          onClick={checkPasswordHandle}
                          className="btn btn-danger rounded-3"
                        >
                          Changes password
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default Profile;
