import React from 'react';
import { Button, Card} from "react-bootstrap";

const Invoices = () => {
  return (
    <>
      <Card>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>Card Invoices</Card.Title>
          <Card.Text></Card.Text>
          <Button variant="primary">Invoices</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Invoices;
