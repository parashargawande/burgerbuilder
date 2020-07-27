import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    let dynamicInput = null;
    switch (props.elementconfig.type) {
        case 'text':
            dynamicInput = <input value={props.value} onChange={props.change} className={props.error.isValid ? [classes.InputElement].join(' '):[classes.Input,classes.InputElementError].join(' ') } {...props.elementconfig} ></input>
            break;
        case 'number':
            dynamicInput = <input  value={props.value} onChange={props.change} className={props.error.isValid ? [classes.InputElement].join(' '):[classes.Input,classes.InputElementError].join(' ') } {...props.elementconfig}></input>
            break;
        case 'email':
            dynamicInput = <input  value={props.value} onChange={props.change} className={props.error.isValid ? [classes.InputElement].join(' '):[classes.Input,classes.InputElementError].join(' ') } {...props.elementconfig}></input>
            break;
        case 'select':
            dynamicInput = <select value={props.value} onChange={props.change} className={props.error.isValid ? [classes.InputElement].join(' '):[classes.Input,classes.InputElementError].join(' ') }  {...props.elementconfig}>
                {props.elementconfig.options.map(el=>(
                    <option key={el} value={el}>{el}</option>
                ))}
            </select>
            break;
        default:
            dynamicInput = <input value={props.value} onChange={props.change} className={props.error.isValid ? [classes.InputElement].join(' '):[classes.Input,classes.InputElementError].join(' ') } {...props.elementconfig} ></input>
            break;
    }

    return <div className={ classes.Input}>
        <label className={classes.Label}>{props.label}</label> <span className={classes.Error}>{props.error.message}</span> 
        {dynamicInput}
    </div>
};
export default Input;