import * as ActionTypes from './ActionTypes';
import axios from '../../axios-order';

export const moreIngredient = (ingredient)=>{
    return{
        type:ActionTypes.MORE_INGREDIENTS,
        ingredient:ingredient
    }
}
export const lessIngredient = (ingredient)=>{
    return{
        type:ActionTypes.LESS_INGREDIENTS,
        ingredient:ingredient
    }
}
export const setIngredient=(data)=>{
    return{
        type:ActionTypes.INIT_INGREDIENTS,
        data:data
    }
}

export const initIngredient =()=>{
    return dispatch=>{
        axios.get('/ingredients.json')
            .then(response => {
                return dispatch(setIngredient(response.data));
            })
            .catch(error => {
                return dispatch({
                    type:ActionTypes.ERROR,
                });
            });
    }
}
