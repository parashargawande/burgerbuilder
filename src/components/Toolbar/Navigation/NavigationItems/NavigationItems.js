import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return <ul className={classes.NavigationItems}>
        <NavigationItem title="Burger Builder" link="/" />
        {props.isAuthenticated ?
            <NavigationItem title="Orders" link="/orders" /> :
            null
        }
        {props.isAuthenticated ?
            <NavigationItem title="Logout" link="/logout" /> :
            <NavigationItem title="Login" link="/auth" />
        }
    </ul>
}
export default NavigationItems;