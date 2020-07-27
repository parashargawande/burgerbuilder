import React, { Component } from 'react';
import Burger from '../../../components/Burger/Burger';
import Buttons from '../../../components/UI/Buttons/Buttons';
import classes from './OrderConfirm.module.css';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

class OrderConfirm extends Component {
    render() {
        let burger = this.props.ingrident !== null ?
            <Burger totalCount={this.props.totalCount} ingrident={this.props.ingrident} ></Burger> :
            <Redirect to='/' />

        return <div className={classes.OrderConfirm}>
            {burger}
            <p><strong>Total Price {this.props.totalCount} Rs</strong></p>
            <div className={classes.ButtonContainer}>
                <Buttons clickHandler={ ()=>this.props.history.push('/userdetails')} type="Success">ORDER</Buttons>
                <Buttons clickHandler={this.props.history.goBack} type="Danger">CANCEL</Buttons>
            </div>
        </div>
    }
}
const mapPropsToState= state=>{
    return {
        ingrident : state.burger.ingrident,
        totalCount: state.burger.totalCount
    }
}

export default connect(mapPropsToState)(OrderConfirm);