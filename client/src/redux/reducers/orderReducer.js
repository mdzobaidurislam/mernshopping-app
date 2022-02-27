import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FALIS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_DETAILS_FALIS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FALIS,
  ORDER_PAY_REST,
} from "../constants/orderConstant";

// create order reducers
export const orderCreateReucer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
        return state
  }
};

// get order reducer
export const getUserOrderReducer = (state={userOrder:[]}, action) =>{
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { 
        loading: true ,
        userOrder:[]
      };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        userOrder: action.payload,
      };
    case ORDER_LIST_FALIS:
      return {
        loading: false,
        error: action.payload,
      };
    default:
        return state
  }
}

// get single order reducers 
export const getSingleOrderReducer =(state={orderIems:{},loading:true,shippingAdress:{}},action)=>{
  switch(action.type){
    case ORDER_DETAILS_REQUEST:
      return{
        ...state,
        loading:true
      }
    case ORDER_DETAILS_SUCCESS:
      return{
        loading:false,
        order:action.payload
      }
    case ORDER_DETAILS_FALIS:
      return{
        loading:false,
        error:action.payload
      }
    default:
      return state
  }
}
//  order pay reducers 
export const orderPayReducer =(state={},action)=>{
  switch(action.type){
    case ORDER_PAY_REQUEST:
      return{
        ...state,
        loading:true
      }
    case ORDER_PAY_SUCCESS:
      return{
        loading:false,
        succes:true,
        paySuccess:action.payload
      }
    case ORDER_PAY_FALIS:
      return{
        loading:false,
        error:action.payload
      }
    case ORDER_PAY_REST:
      return{}
    default:
      return state
  }
}