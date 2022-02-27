import axios from "axios";
import {
  ADMIN_CHECK_REQUEST,
  ADMIN_CHECK_SUCCESS,
  ADMIN_CHECK_FALIS,
} from "../../constants/Admin/AdminCheckConstant";

// admin check
export const adminCheck = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_CHECK_REQUEST,
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
    const { data } = await axios.get(`/api/admin`, config);
    dispatch({
      type: ADMIN_CHECK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CHECK_FALIS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
