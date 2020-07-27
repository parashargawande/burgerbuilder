import React from 'react';
import classes from './SidePannel.module.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SidePannel = (props) => {

    let dynamicClass = [];
    dynamicClass.push(classes.SidePannel);
    props.sidePannelOpen ? dynamicClass.push('') : dynamicClass.push(classes.Close);

    return <Aux>
        <Backdrop cancelOrder={props.closeSidePannel}
            show={props.sidePannelOpen}></Backdrop>
        <div className={dynamicClass.join(' ')}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <NavigationItems isAuthenticated={props.isAuthenticated} />
        </div>
    </Aux>
}
export default SidePannel;