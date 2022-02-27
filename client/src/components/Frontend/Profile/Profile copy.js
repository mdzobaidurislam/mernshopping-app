import React from "react";
import { Button, Card, Col, ListGroup, Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
  return (
    <>
      <Row className="mt-5">
        <Col md={4}>
          <ListGroup as="ul">

            <ListGroup.Item as="li">
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
            </ListGroup.Item>

            <ListGroup.Item as="li">
            <LinkContainer to="/profile/address">
              <Nav.Link>Address</Nav.Link>
            </LinkContainer>
            </ListGroup.Item>

          </ListGroup>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
