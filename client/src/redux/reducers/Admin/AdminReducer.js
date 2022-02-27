import {
  ADMIN_CHECK_FALIS,
  ADMIN_CHECK_REQUEST,
  ADMIN_CHECK_SUCCESS,
} from "../../constants/Admin/AdminCheckConstant";

// login Reducer
export const adminCheckReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CHECK_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_CHECK_SUCCESS:
      return {
        loading: false,
        success: true,
        adminCheck: action.payload,
      };
    case ADMIN_CHECK_FALIS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
