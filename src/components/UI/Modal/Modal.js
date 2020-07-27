import React from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = (props)=>(
    <Aux>
    <Backdrop cancelOrder={props.cancelOrder} show={props.show}></Backdrop>
    <div className={classes.Modal} style={{
        transform : props.show ? 'translateY(0)':'translateY(-100vh)',
        opacity: props.show ? '1':'0'
    }}> 
        {props.children}
    </div>
    </Aux>
);
export default Modal;