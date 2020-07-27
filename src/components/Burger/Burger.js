import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';

const Burger = (props)=> {
    let transIngredient = Object.keys(props.ingrident)
    .map((igkey)=>{
        return [...Array(props.ingrident[igkey])].map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey}/>
        });
    }).reduce((init,curr)=>{
        return init.concat(curr);
    },[]);

    if (transIngredient.length === 0 ) {
        transIngredient = <p>Please add ingridents</p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transIngredient}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;