import React, { useEffect } from "react";
import {
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { addToCart, removeFromCart } from "../../../redux/action/cartAction";
import Message from "../shared/Message";

const Cart = () => {
  const param = useParams();
  const navigation = useNavigate();

  const productId = param.id;
  const productQty = param.qty ? param.qty : 1;

  console.log(productQty);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, productQty));
    }
  }, [dispatch, productId, productQty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log(cartItems);

  // removeFromCarthandler
  const removeFromCarthandler = (id) => {
    console.log(id);
    dispatch(removeFromCart(id));
  };
  // checkout
  const checkout = () => {
    navigation("/shipping");
  };
  return (
    <>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty ! <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} rounded fluid />
                    </Col>
                    <Col md={5}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={1}>${item.price}</Col>
                    <Col md={3}>
                      <Row>
                        <Col md={3} className="text-end">
                          {" "}
                          Qty:
                        </Col>
                        <Col md={9}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(addToCart(item.product, e.target.value))
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={1}>
                      <Button
                        onClick={() => removeFromCarthandler(item.product)}
                        variant="danger"
                      >
                        <i className="fa fa-trash danger"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h3>
                  Subtotal:
                  {cartItems.reduce(
                    (total, item) => total + Number(item.qty),
                    0
                  )}{" "}
                  items
                </h3>
                <strong>
                  Price: $
                  {cartItems
                    .reduce(
                      (total, item) => total + Number(item.qty * item.price),
                      0
                    )
                    .toFixed(2)}
                </strong>
              </ListGroupItem>
            </ListGroup>
            <Button
              className="btn btn-primary"
              type="button"
              disabled={cartItems.length === 0}
              onClick={checkout}
            >
              Proceed to checkout
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
