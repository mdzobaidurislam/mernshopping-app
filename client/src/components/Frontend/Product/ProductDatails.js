import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Button,
  Image,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../Rating/Rating";
import { listProductdetails } from "../../../redux/action/productActions";
import Loader from "../shared/Loader";
import Message from "../shared/Message";

const ProductDatails = () => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const param = useParams();
  useEffect(() => {
    dispatch(listProductdetails(param.id));
  }, [dispatch, param]);

  // add to  cart
  const history = useNavigate();
  const addToCartHandler = () => {
    history(`/cart/${param.id}/${qty}`);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Link to="/" className="btn btn-light mt-3">
            <i className="pe-3 fas fa-arrow-left"></i>
            Go Back
          </Link>
          <Row className="mt-5">
            <Col md={5}>
              <Image src={product.image} fluid alt={product.name} />
            </Col>
            <Col md={4}>
              <ListGroup>
                <ListGroupItem>
                  <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroupItem>
                <ListGroupItem>Price:${product.price}</ListGroupItem>
                <ListGroupItem>Description:{product.description}</ListGroupItem>
              </ListGroup>
            </Col>
            <Col md={3}>
              <ListGroupItem>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "out of Stock"}
                  </Col>
                </Row>
              </ListGroupItem>
              {product.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Form.Control
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroupItem>
              )}
              <ListGroupItem className="d-grid">
                <Button className="btn btn-primary" onClick={addToCartHandler}>
                  Add to cart
                </Button>
              </ListGroupItem>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default ProductDatails;
