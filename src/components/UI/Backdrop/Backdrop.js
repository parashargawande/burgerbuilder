import React from 'react';
import classes from './Backdrip.module.css';

const backdrop = (props)=> (
    props.show ? <div onClick={props.cancelOrder} className={classes.Backdrop}></div>:null
);
export default backdrop;