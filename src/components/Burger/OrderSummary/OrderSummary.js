import React from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Buttons/Buttons';

const OrderSummary = (props)=>{
    const ingridentSum = Object.keys(props.ingridents)
    .map((el)=>{
    return <li key={el}>{el} : {props.ingridents[el]}</li>
    });

    return <Aux>
        <p>Your order summary</p>
        <ul>
            {ingridentSum}
        </ul>
        <strong>Your Price is : {props.price}</strong>
        <p>Continue to checkout ?</p>
        <Button clickHandler={props.placeOrder} type='Success'>Place order</Button>
        <Button clickHandler={props.cancelOrder} type='Danger'>cancel order</Button>
    </Aux>
}
export default OrderSummary;