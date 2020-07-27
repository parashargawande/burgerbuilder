import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Context from '../../Context/Context';
import Classes from './BurgerBuilder.module.css';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Loader from '../../components/UI/Loader/Loader';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as ActionDispatcher from '../../Store/Actions/index';

class BurgerBuilder extends Component {
    state = {
        showModel: false,
        loader: false,
        error: null
    }
    componentDidMount() {
        console.log("[BurgerBuilder] componentdidmount");
        this.props.initIngredient();
    }

    enableCheckout = (ingrident) => {
        let sum = Object.keys(ingrident)
            .map((el, key) => {
                return ingrident[el];
            })
            .reduce((sum, curr) => {
                return sum + curr;
            }, 0);
        return sum > 0;
    }
    modelHandler = () => {
        this.setState({ showModel: true });
        
    }
    cancelOrder = () => {
        this.setState({ showModel: false });
    }
    placeOrder = () => {
        this.props.orderProcessStart();
        
        if(this.props.isAuthenticated){
            this.props.history.push('/orderconfirm');
        }else{
            this.props.setReturnUrl('/orderconfirm');
            this.props.history.push('/auth');
        }
    }

    render() {
        const disabledInfo = {
            ...this.props.ingrident
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        const orderSummary = this.state.loader || this.props.ingrident === null ?
            <Loader /> :
            <OrderSummary price={this.props.totalCount}
                placeOrder={this.placeOrder}
                cancelOrder={this.cancelOrder}
                ingridents={this.props.ingrident} />;

        let burger = this.props.ingrident !== null ?
            <Aux>
                <Burger totalCount={this.props.totalCount} ingrident={this.props.ingrident} />
                <p className={Classes.totalCount}>Total Price :{this.props.totalCount}</p>
                <Context.Provider value={{
                    moreIngredient: (type) => this.props.moreIngredient(type),
                    lessIngredient: (type) => this.props.lessIngredient(type),
                    disabledBtns: disabledInfo
                }}>
                    <BuildControls
                        isAuthenticated={this.props.isAuthenticated}
                        enableCheckout={this.enableCheckout(this.props.ingrident)}
                        modelHandler={this.modelHandler} />
                </Context.Provider>
            </Aux> :
            <Loader />;
        if (this.props.error) {
            burger = <p>error unnable to load burger</p>
        }

        return (
            <Aux>
                <Modal show={this.state.showModel}
                    cancelOrder={this.cancelOrder}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    };
}
const mapStateToProps = (state) => {
    return {
        price: state.burger.price,  //price obj of ingredients
        ingrident: state.burger.ingrident, //store ingredients in the burger
        totalCount: state.burger.totalCount,
        error: state.burger.error,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        moreIngredient: (ingredient) => dispatch(ActionDispatcher.moreIngredient(ingredient)),
        lessIngredient: (ingredient) => dispatch(ActionDispatcher.lessIngredient(ingredient)),
        initIngredient: () => dispatch(ActionDispatcher.initIngredient()),
        orderProcessStart: () => dispatch(ActionDispatcher.orderProcessStart()),
        setReturnUrl : (url)=> dispatch(ActionDispatcher.setReturnUrl(url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));