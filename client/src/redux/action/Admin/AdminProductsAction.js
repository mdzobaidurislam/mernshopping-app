import axios from "axios";

import {
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FALIS,
  ADMIN_PRODUCT_ADD_REQUEST,
  ADMIN_PRODUCT_ADD_SUCCESS,
  ADMIN_PRODUCT_ADD_FALIS,
} from "./../../constants/Admin/AdminProductConstant";
// list product
export const AdminlistProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: ADMIN_PRODUCT_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/products`);
    dispatch({
      type: ADMIN_PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_LIST_FALIS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const AdminAddProduct = (product) => async (dispatch,getState) => {
    try {
      dispatch({
        type: ADMIN_PRODUCT_ADD_REQUEST,
      });
console.log(product);
      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/admin/addproduct`,
         product,
        config
      );
      dispatch({
        type: ADMIN_PRODUCT_ADD_SUCCESS,
        payload: data,
      });
  
    } catch (error) {
      dispatch({
        type: ADMIN_PRODUCT_ADD_FALIS,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };