import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { payOrder } from "../../../redux/action/orderAction";

const StripeCheckoutButton = ({ orderId, price }) => {
  // const orderPay = useSelector((state) => state.orderPay);

  // const {success } = orderPay;
  // console.log(success);

  const dispatch = useDispatch();
  const totalPrice = price * 100;
// REACT_APP_PUBLISHABLE_KEY = pk_test_51KRIZyGc1O5eSd4LphWyoV4YmlLeOK52CF07vMz5KPOTbsg8mk0wPhL4rgbsUY4RGHWAKwbGmLEKle4BZ0XCIM0e00RrlmYPya
  const publishableKey = "pk_test_51KRIZyGc1O5eSd4LphWyoV4YmlLeOK52CF07vMz5KPOTbsg8mk0wPhL4rgbsUY4RGHWAKwbGmLEKle4BZ0XCIM0e00RrlmYPya";
  // const publishableKey = process.env.REACT_APP_PUBLISHABLE_KEY;
  const history = useNavigate();
  const onToken = (token) => {
    // console.log(token);

    dispatch(payOrder(token, price));

    history(`/order/${orderId}`);
  };

  return (
    <StripeCheckout
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={totalPrice}
      token={onToken}
      stripeKey={publishableKey}
      currency="USD"
    >
      <Button type="button" className="btn btn-primary ">
        PAY NOW
      </Button>
    </StripeCheckout>
  );
};

export default StripeCheckoutButton;
