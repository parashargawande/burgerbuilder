import React, { Component } from 'react';
import classes from './Orders.module.css';
import Order from '../../../components/Order/Order';
import axios from '../../../axios-order';
import Loader from '../../../components/UI/Loader/Loader';
import Aux from '../../../hoc/Auxilary/Auxilary';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as ActionDispatcher from '../../../Store/Actions/index';

class Orders extends Component {
    
    componentDidMount() {
        this.props.fetchOrderStart(this.props.token,this.props.userId);
    }

    render() {
        const ordersArr = [];
        for (let key in this.props.orders) {
            ordersArr.push({
                key: key,
                ingredients: this.props.orders[key].ingredients,
                price: this.props.orders[key].totalCount
            })
        }

        let content = this.props.loading ?
            <Loader /> :
            <div className={classes.Orders}>
                {ordersArr.map(ord => (
                    <Order key={ord.key} price={ord.price} ingredients={ord.ingredients} />
                ))}
            </div>;
        if (this.props.error) {
            content=<p>unnable to fetch the orders</p>
        }
        return <Aux>
            {content}
        </Aux>
    }
}
const mapPropsToState=state=>{
    return{
        orders: state.order.order,
        loading : state.order.loading,
        error: state.order.error,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapPropsToDispatch = dispatch =>{
    return {
        fetchOrderStart : (token,userId)=> dispatch(ActionDispatcher.fetchOrderStart(token,userId))
    }
}

export default connect(mapPropsToState,mapPropsToDispatch)(withErrorHandler(Orders, axios));