import React from 'react';
import logoimg from '../../../assets/images/burger.png';
import classes from './Logo.module.css';

const Logo=()=>(
    <div className={classes.Logo}>
        <img alt="Logo" src={logoimg}></img>
    </div>
);
export default Logo;