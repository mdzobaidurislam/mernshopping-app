import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../redux/action/userAction";

const Header = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();
  // logoutHandler
  const logoutHandler = () => {
    // console.log("logoutHandler");
    dispatch(logout());
  };

  return (
    <>
      {/* check router is not authenticated admin */}

      <Navbar bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopping App</Navbar.Brand>
          </LinkContainer>

          <Nav className="ml-auto">
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>

            <LinkContainer to="/cart">
              <Nav.Link>
                <i className="fas fa-shopping-cart mr-3"></i> Cart
              </Nav.Link>
            </LinkContainer>

            <LinkContainer to="/product">
              <Nav.Link>Product</Nav.Link>
            </LinkContainer>

            {userInfo ? (
              <NavDropdown
                title={userInfo.name.toUpperCase()}
                id="basic-nav-dropdown"
              >
                <LinkContainer to="/user/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/user/orders">
                  <NavDropdown.Item>My Orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-sign-in-alt"></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
