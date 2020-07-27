import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {

    let ingredients=[];
    for(let ing in props.ingredients)
    {
        ingredients.push( {ingredient : ing,
            value: props.ingredients[ing]
        })
    }
    const ingString = 
    ingredients.map((ing) => (
        ing.ingredient +'('+ ing.value+')'+', '
    ))

    return <div className={classes.Order}>
        <p><strong>Order Ingredients:  </strong>
            {ingString}    
        </p>
        <p><strong>Price : {props.price} RS</strong></p>
    </div>
}
export default Order;