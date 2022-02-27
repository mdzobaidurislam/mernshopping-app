import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../../redux/action/productActions";
import { Row } from "react-bootstrap";
import ProductItem from "./ProductItem";
import Loader from "../shared/Loader";
import Message from "../shared/Message";
const Product = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const { loading, products, error } = useSelector(
    (state) => state.productList
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </Row>
      )}
    </>
  );
};

export default Product;
