const {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_PASSWORD,
  USER_UPDATE_FAIL,
} = require("../constants/userConstant");
// login Reducer
export const userLoginReducer = (state={}, action) =>{
switch (action.type) {
    case USER_LOGIN_REQUEST:
        return{
            loading:true,
        }
    case USER_LOGIN_SUCCESS:
        return{
            loading:false,
            userInfo:action.payload
        }
    case USER_LOGIN_FAIL:
        return{
            loading:false,
            error:action.payload
        }
    case USER_LOGOUT:
        return{}
    default:
        return state
}

}
// Register Reducer
export const userRegisterReducer = (state={}, action) =>{
switch (action.type) {
    case USER_REGISTER_REQUEST:
    return{
            loading:true,
        }
    case USER_REGISTER_SUCCESS:
        return{
            loading:false,
            userInfo:action.payload
        }
    case USER_REGISTER_FAIL:
        return{
            loading:false,
            error:action.payload
        }
    default:
        return state
}

}
// User Datails Reducer
export const userDetailsReducer = (state={user:{}}, action) =>{
    switch(action.type){
        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true
            }
        case USER_DETAILS_SUCCESS:
            return{
                loading:false,
                user:action.payload
            }
        case USER_DETAILS_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}
// USER UPDATE DATAILS
export const userUpdateDetailsReducer = (state={userUpdate:{}}, action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
            return{
                ...state,
                loading:true
            }
        case USER_UPDATE_SUCCESS:
            return{
                loading:false,
                userUpdate:action.payload
            }
        case USER_UPDATE_PASSWORD:
            return{
                loading:false,
                userUpdate:action.payload
            }
        case USER_UPDATE_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}