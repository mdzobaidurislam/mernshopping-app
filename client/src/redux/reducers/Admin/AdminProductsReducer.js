import {
  ADMIN_PRODUCT_LIST_REQUEST,
  ADMIN_PRODUCT_LIST_SUCCESS,
  ADMIN_PRODUCT_LIST_FALIS,
  ADMIN_PRODUCT_ADD_REQUEST,
  ADMIN_PRODUCT_ADD_SUCCESS,
  ADMIN_PRODUCT_ADD_FALIS,
} from "./../../constants/Admin/AdminProductConstant";

// product list 
export const AdminProductListReducer = (state = { adminProducts: [] }, action) => {
  switch (action.type) {
    case ADMIN_PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        adminProducts: [],
      };
    case ADMIN_PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        adminProducts: action.payload,
      };
    case ADMIN_PRODUCT_LIST_FALIS:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

// add product
export const AdminAddProductReducer = (state={}, action) =>{
  switch (action.type) {
      case ADMIN_PRODUCT_ADD_REQUEST:
      return{
              loading:true,
          }
      case ADMIN_PRODUCT_ADD_SUCCESS:
          return{
              loading:false,
              success: true,
              addProduct:action.payload
          }
      case ADMIN_PRODUCT_ADD_FALIS:
          return{
              loading:false,
              error:action.payload
          }
      default:
          return state
  }
}