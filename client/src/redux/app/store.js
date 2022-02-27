import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  ProductListReducer,
  productDetailsReducer,
} from "../reducers/ProductsReducer";
import { cartReducer } from "../reducers/cartReducer";
import { userLoginReducer,userRegisterReducer,userDetailsReducer ,userUpdateDetailsReducer} from "../reducers/userReducer";
import { orderCreateReucer,getUserOrderReducer,getSingleOrderReducer, orderPayReducer } from "../reducers/orderReducer";
import { AdminProductListReducer,AdminAddProductReducer } from "../reducers/Admin/AdminProductsReducer";
import { adminCheckReducer } from "../reducers/Admin/AdminReducer";

// save shippingAdress
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')) :{}
const paymentMethodFromLocalStorage = localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')) :null

// User localStorage
const userInfoFromLocalStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')) :null

// Cart localStorage
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: ProductListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegiser: userRegisterReducer,
  userDetails:userDetailsReducer,
  userUpdate: userUpdateDetailsReducer,
  orderCreate:orderCreateReucer,
  userOrders:getUserOrderReducer,
  orderDetails:getSingleOrderReducer,
  orderPay: orderPayReducer,
  adminProductList: AdminProductListReducer,
  adminAddProduct: AdminAddProductReducer,
  adminCheck:adminCheckReducer
});

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
    paymentMethod: paymentMethodFromLocalStorage,
  },
  userLogin:{
    userInfo:userInfoFromLocalStorage
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
// console.log(store.getState())

// store.dispatch({
//   type: 'ADD_TODO',
//   text: 'Use Redux'
// })
// console.log(store.getState())

export default store;
