import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FALIS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FALIS
} from "../constants/productConstant";
export const ProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FALIS:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};


// DETAILS 

export const productDetailsReducer =(state={product:{reviews:[]}},action)=>{
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return{
                loading: false,
                product: action.payload
            }
        case PRODUCT_DETAILS_FALIS:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}