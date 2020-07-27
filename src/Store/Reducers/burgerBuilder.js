import * as actionTypes from '../Actions/ActionTypes';
const initState = {
    price: null,  //price obj of ingredients
    ingrident: null, //store ingredients in the burger
    totalCount: null,
    error:false,
    building:false
}
const burgerBuilderReducer = (state = initState, action) => {
    let updatedState={...state};
    switch (action.type) {
        case actionTypes.ERROR:
            updatedState.error=true;
            return updatedState;
            
        case actionTypes.INIT_INGREDIENTS:
            updatedState.price = {...action.data.Price};
            updatedState.ingrident={
                salad:action.data.types.salad,
                bacon:action.data.types.bacon,
                cheese:action.data.types.cheese,
                meat:action.data.types.meat
            };
            updatedState.building=false;
            updatedState.error=false;
            updatedState.totalCount=action.data.totalCount;
            return updatedState;

        case actionTypes.MORE_INGREDIENTS:
            updatedState.ingredient={...state.ingrident}
            updatedState.ingrident[action.ingredient] = state.ingrident[action.ingredient] + 1;
            updatedState.totalCount = state.totalCount + state.price[action.ingredient];
            updatedState.building=true;
            return updatedState;

        case actionTypes.LESS_INGREDIENTS:
            updatedState.ingredient={...state.ingrident}
            if (updatedState.ingrident[action.ingredient] > 0) {
                updatedState.ingrident[action.ingredient] = state.ingrident[action.ingredient] - 1;
                updatedState.totalCount = state.totalCount - state.price[action.ingredient];
                updatedState.building=true;
            }
            return updatedState;

        default:
            break;
    }

    return state;
}
export default burgerBuilderReducer;