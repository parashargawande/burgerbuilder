import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'}
]

const BuildControls = (props)=>{
    return <div className={classes.BuildControls}>
        {controls.map((control)=>{
            return <BuildControl 
            moreIngredient={props.moreIngredient} 
            key={control.label} 
            type={control.type}
            label={control.label} />
        })}
        <button onClick={props.modelHandler} disabled={!props.enableCheckout} className={classes.OrderButton}>{ props.isAuthenticated ? "CHECK OUT":"SIGN IN TO CHECKOUT" }</button>
    </div>
}
export default BuildControls;