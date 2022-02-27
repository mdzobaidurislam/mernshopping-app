import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

const ProductItem = ({ product }) => {
  return (
    <>
      <Col md={3} className="mt-3 mb-3">
      <Card>
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
          <Card.Text>${product.price}</Card.Text>
        </Card.Body>
      </Card>
      </Col>
    </>
  );
};

export default ProductItem;
