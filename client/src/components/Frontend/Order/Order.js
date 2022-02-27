import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../../redux/action/orderAction";
import { Card, Row, Col } from "react-bootstrap";
import Loader from "../shared/Loader";
import Message from "../shared/Message";
import OrderItem from "./OrderItem";
const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch]);

  const { loading, error, userOrder } = useSelector(
    (state) => state.userOrders
  );

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col>
            <Card.Header className="fw-bold fs-3">
              Total Order:{userOrder.length}
            </Card.Header>
          </Col>
          {userOrder.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </Row>
      )}
    </>
  );
};

export default Order;
