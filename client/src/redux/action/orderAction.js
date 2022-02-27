import axios from "axios";

import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FALIS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FALIS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FALIS,
} from "../constants/orderConstant";

// order create
export const orderCreateAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/order", order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("paymentMethod");
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// get user order
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/order`, config);
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FALIS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// get single order details
export const getSingleOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.get(`/api/order/${id}`,config)
    dispatch({
      type:ORDER_DETAILS_SUCCESS,
      payload: data
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FALIS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


// get single order details
export const payOrder = (token,totalPrice) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {userLogin: { userInfo }} = getState();
    const {orderDetails: { order }} = getState();
    const orderId = order._id
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const {data} = await axios.post(`/api/order/pay`,{token,totalPrice,userInfo,orderId},config)
  
    dispatch({
      type:ORDER_PAY_SUCCESS,
      payload: data
    })
    console.log(data)
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FALIS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
