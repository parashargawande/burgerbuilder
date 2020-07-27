import * as ActionTypes from './ActionTypes';
import axios from '../../axios-order';

const placeOrder=(order)=>{
    return {
        type:ActionTypes.ORDER_COMPLETE,
        order:order
    }
}
export const orderProcessStart=()=>{
    return {
        type:ActionTypes.ORDER_PROCESS_START,
    }
}

const error=()=>{
    return{
        type:ActionTypes.ORDER_ERROR
    }
}
export const orderStart=(order,token)=>{
    return dispatch=>{
        dispatch({
            type:ActionTypes.START_LOADING
        });
        axios.post('/orders.json?auth='+token, order)
        .then(response => {
            console.log(response);
            return dispatch(placeOrder(response));
        }).catch(er => {
            console.log(er);
            return dispatch(error());
        });
    }
}

const fetchOrder = (orders)=>{
    return {
        type:ActionTypes.FETCH_ORDER_START,
        orders:orders
    }
}
const fetchOrderFail = (error)=>{
    return {
        type:ActionTypes.FETCH_ORDER_FAIL,
        error:error
    }
}
export const fetchOrderStart = (token,userId)=>{
    return dispatch=>{
        dispatch({
            type:ActionTypes.START_LOADING
        });
        const queryparams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryparams)
        .then(resonse => {
            return dispatch(fetchOrder(resonse.data));
        }).catch(error => {
            return dispatch(fetchOrderFail(error));
        });
    }
}