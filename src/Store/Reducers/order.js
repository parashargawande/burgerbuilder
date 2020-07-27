import * as actionTypes from '../Actions/ActionTypes';

const initState = {
    order: {},
    error: false,
    loading: false,
    orderComplete: false
}
const orderReducer = (state = initState, action) => {
    switch (action.type) {

        case actionTypes.ORDER_PROCESS_START:
            return {
                ...state,
                orderComplete: false
            }
        case actionTypes.START_LOADING:
            return {
                ...state,
                error: false,
                loading: true,
                orderComplete: false
            }
        case actionTypes.ORDER_COMPLETE:
            return {
                ...state,
               // order: state.order.concat(action.order),
                error: false,
                loading: false,
                orderComplete: true
            }

        case actionTypes.ORDER_ERROR:
            return {
                ...state,
                error: true,
                loading: false,
                orderComplete: false
            }
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                order: action.orders,
                error: false,

                loading: false
            }
        case actionTypes.FETCH_ORDER_FAIL:
            return {
                ...state,
                error: true,
                loading: false
            }
        default:
            return state;
    }

}
export default orderReducer;

