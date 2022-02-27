import React, { useEffect, useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../../../redux/action/cartAction";
import CheckoutStep from "../shared/CheckoutStep";

const Payment = () => {
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  console.log(paymentMethod);
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const history = useNavigate();

  useEffect(() => {
    if (Object.keys(shippingAddress).length === 0) {
      history("/shipping");
    }
  }, [shippingAddress, history]);
  // submitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history("/placeorder");
  };
  return (
    <>
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Payment method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              label="Paypal or Credit Card"
              id="paypal"
              name="paymentMethod"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Countinue
        </Button>
      </Form>
    </>
  );
};

export default Payment;
