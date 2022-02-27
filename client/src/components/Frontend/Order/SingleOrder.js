import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../../../redux/action/orderAction";

import {
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

import Message from "../shared/Message";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../shared/Loader";
import StripeCheckoutButton from "./../stripe-button/stripe";

const SingleOrder = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const singleOrderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = singleOrderDetails;

  const history = useNavigate();
  const orderPay = useSelector((state) => state.orderPay);
  const { success } = orderPay;

  useEffect(() => {
    dispatch(getSingleOrder(param.id));
    if (success) {
      history(`/order/${param.id}`);
    }
  }, [dispatch, param.id]);

  
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order id: {order._id} </h2>
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong> Address:</strong> {order.shippingAddress.address}
                <strong> City: </strong>
                {order.shippingAddress.city}
                <strong> Postal Code:</strong>
                {order.shippingAddress.postalCode}
                <strong> Country:</strong> {order.shippingAddress.country}
              </p>
              <h5>
                <strong>Name:</strong> {order.User.name} <br />
                <strong>Email:</strong> {order.User.email} <br />
                <strong>Phone:</strong> {order.User.phone} <br />
              </h5>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item>
              <h5>
                Payment status:{" "}
                <span className="text-danger">
                  {order.isPaid ? "Paid" : "Not Paid"}
                </span>{" "}
              </h5>

              <h5>
                Delivery status:{" "}
                <span className="text-danger">
                  {order.isDelevired ? "Delivery" : "Not Delivery"}
                </span>{" "}
              </h5>

              <h5>
                Payment Method:{" "}
                <span className="text-danger">
                  {order.payment.toUpperCase()}
                </span>{" "}
              </h5>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {order.orderItems.length === 0 ? (
                <Message variant="danger">Your cart is empty!</Message>
              ) : (
                <ListGroup>
                  {order.orderItems.map((item, index) => (
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid />
                        </Col>
                        <Col md={4}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}X ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Total Items Price:</Col>
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
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              {!order.isPaid ? (
                <StripeCheckoutButton
                  orderId={param.id}
                  price={order.totalPrice}
                />
              ) : (
                ""
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleOrder;
