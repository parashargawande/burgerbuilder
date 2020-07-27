import * as actionTypes from '../Actions/ActionTypes';
const initState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    returnUrlPath: '/'
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                error: false,
                loading: true
            }
        case actionTypes.LOGIN:
            return {
                ...state,
                error: false,
                loading: false,
                token: action.token,
                userId: action.userId
            }
        case actionTypes.AUTH_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                error: null,
                loading: null,
                token: null
            }
        case actionTypes.AUTH_SET_RETURN_URL:
            return {
                ...state,
                returnUrlPath: action.url
            }
        default:
            return state;
    }
}
export default authReducer;