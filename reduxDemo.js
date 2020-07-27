const redux = require('redux');

const initState={
    counter:0
}
const reducer=(state=initState,action)=>{
    return state;
}
const store= redux.createStore(reducer);
store.subscribe(()=>{
    console.log(store.getState())
})

store.dispatch({ type:'ACTION1' });