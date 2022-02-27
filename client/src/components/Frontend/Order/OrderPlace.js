import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { orderCreateAction } from "../../../redux/action/orderAction";

import Message from "../shared/Message";
import CheckoutStep from "../shared/CheckoutStep";

const OrderPlace = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  const orderCreate = useSelector((state) => state.orderCreate);

  const { order, success, error } = orderCreate;
  // fun for decimal
  const addDecimal = (num) => {
    return Math.round(num).toFixed(2);
  };
  cart.totalItemPrice = addDecimal(
    cartItems.reduce((acc, item) => acc + item.price, 0)
  );
  cart.shippingPrice = addDecimal(cartItems > 500 ? 0 : 50);
  cart.taxPrice = addDecimal(Number(0.15 * cart.totalItemPrice));
  cart.totalPrice =
    Number(cart.totalItemPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);

  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      orderCreateAction({
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalItemPrice: cart.totalItemPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      history("/shipping");
    } else if (success) {
      history(`/order/${order._id}`);
    }
  }, [shippingAddress, history, success, orderCreate,order]);
  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <h5>
                <strong>Address:</strong>
                {shippingAddress.address}
                {shippingAddress.city}
                {shippingAddress.postalCode}
                {shippingAddress.country}
              </h5>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <h5>{paymentMethod.toUpperCase()}</h5>
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <ListGroup.Item>
              <h2>Order Items:</h2>
              {cartItems.length === 0 ? (
                <Message variant="danger">Your cart is empty!</Message>
              ) : (
                <ListGroup>
                  {cartItems.map((item, index) => (
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
                  <Col>${cart.totalItemPrice}</Col>
                </Row>
                <Row>
                  <Col>Shippng Price:</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax Price:</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total Price:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroupItem>
              <Button
                type="button"
                className="btn btn-primary "
                disabled={cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Order place
              </Button>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderPlace;
