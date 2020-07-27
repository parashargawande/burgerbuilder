import React from 'react';
import classes from './Buttons.module.css';

const Buttons = (props) => (
    <button onClick={props.clickHandler}
        className={[classes.Button, classes[props.type]].join(' ')}>
        {props.children}
    </button>
);

export default Buttons;