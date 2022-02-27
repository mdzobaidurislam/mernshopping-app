import React from 'react';
import { Button, Card} from "react-bootstrap";
const Dashboard = () => {
    return (
        <>
            <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>
                
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </>
    );
};

export default Dashboard;