import React from "react";
import {
  Card,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Image,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  return (
    <>
      <Col md={12} className="mt-3 mb-3">
        <Row className="border-bottom pb-5">
          <Col md={8}>
            <Row>
              <Col>
                <h3>Order Id: <span className="text-danger">{order._id}</span> </h3>
              </Col>
            </Row>
            <Row>
              <Col>
              <ListGroup>
            {order.orderItems.map((orderItem) => (
              <ListGroup.Item key={orderItem._id}>
              <Row>
                <Col md={2}>
                  <Image className="w-50" src={orderItem.image} />
                </Col>
                <Col md={6}>
                  {" "}
                  <h5>
                    <Link to={`/order/${order._id}`}>
                      {orderItem.name}
                    </Link>
                  </h5>{" "}
                </Col>
                <Col md={2}>Quantity:{orderItem.qty}</Col>
                <Col md={2}>Price:{orderItem.price}</Col>
              </Row>
              </ListGroup.Item>
            ))}
            </ListGroup>
              </Col>
            </Row>
            
            <Row>
              <Col md={10}>
                <h5>Shpping Address:</h5>
                <p>
                  <strong> Address:</strong> {order.shippingAddress.address} 
                   <strong> City: </strong>
                  {order.shippingAddress.city} 
                  <strong> Postal Code:</strong>
                  {order.shippingAddress.postalCode}
                  <strong> Country:</strong> {order.shippingAddress.country}
                  
                </p>

                <h5>Payment status:  <span className="text-danger">{order.isPaid ? 'Paid':'Not Paid'}</span>  </h5>
                
                <h5>Delivery status: <span className="text-danger">{order.isDelivery ? 'Delivery':'Not Delivery'}</span>  </h5>
                
                <h5>Payment Method: <span className="text-danger">{order.payment}</span>  </h5>
              </Col>
            </Row>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroupItem>
                  <h2>Order Summary</h2>
                </ListGroupItem>
                <ListGroupItem>
                  <Row>
                    <Col>Items Price:</Col>
                    <Col>${order.totalItemPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shippng Price:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Tax Price:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
            <div className="d-grid ">
              <Button type="button" variant="danger" className="mt-3 ">
                Cancel Order
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default OrderItem;
