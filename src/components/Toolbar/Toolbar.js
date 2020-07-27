import React from 'react';
import classes from './Toolbar.module.css';
import Logo from './Logo/Logo';
import NavigationItems from './Navigation/NavigationItems/NavigationItems';

const Toolbar=(props)=>(
    <div className={classes.Toolbar}>
        <div className={classes.MenuButton} onClick={props.toggleSidePannel}>Menu</div>
        <div className={classes.HideNavItems} style={{width:'60px'}}>
            <Logo />
        </div>
        <div className={classes.HideNavItems}>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </div>
    </div>

);
export default Toolbar;