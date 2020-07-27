import React from 'react';
import classes from './BuildControl.module.css';
import Context from '../../../../Context/Context';

const BuildControl = (props) => {
    return <Context.Consumer>
        {(context) => {
            return <div className={classes.BuildControl}>
                <div className={classes.Label}>{props.label}</div>
                <button
                    value={props.label}
                    onClick={() => context.lessIngredient(props.type)}
                    className={classes.Less}
                    disabled={context.disabledBtns[props.type]}
                >less</button>
                <button
                    value={props.label}
                    onClick={() => context.moreIngredient(props.type)}
                    className={classes.More}
                >More</button>
            </div>
        }}
    </Context.Consumer>
}
export default BuildControl;