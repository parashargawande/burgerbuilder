import React, { Component } from 'react';
import classes from './UserDetails.module.css';
import Buttons from '../../../components/UI/Buttons/Buttons';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import axios from '../../../axios-order';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as ActionDispatcher from '../../../Store/Actions/index';
import Loader from '../../../components/UI/Loader/Loader';
import { Redirect } from 'react-router';

class UserDetails extends Component {
    state = {
        form: {
            name: {
                label: 'Name',
                elementtype: 'input',
                elementconfig: {
                    placeholder: "Enter Name",
                    name: 'name',
                    type: 'text',
                },
                value: '',
                rules: {
                    required: true
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false
            },
            email: {
                label: 'Email',
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: "Enter Email"
                },
                value: '',
                rules: {
                    required: true
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false

            },
            street: {
                label: 'Street Address',
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: "Enter Street"
                },
                value: '',
                rules: {
                    required: true
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false

            },
            pincode: {
                label: 'Pin Code',
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: "Pin Code"
                },
                value: '',
                rules: {
                    required: true,
                    minlength: 6,
                    maxlength: 6
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false

            },
            delivary: {
                label: 'Delivary Type',
                elementtype: 'input',
                elementconfig: {
                    type: 'select',
                    options: ['fastest', 'cheapest']
                },
                value: 'fastest',
                rules: {
                    required: true
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false
            }
        }
    }
    validate = (updatedForm, id) => {
        let isValid = true;
        updatedForm[id].error.isValid = true;
        updatedForm[id].error.message = "";

        if (updatedForm[id].rules['required'] && updatedForm[id].value === '') {
            updatedForm[id].error.message = "Required";
            updatedForm[id].error.isValid = false && isValid;
        }
        if (updatedForm[id].rules['minlength'] && updatedForm[id].value.length < updatedForm[id].rules['minlength']) {
            updatedForm[id].error.message = "Minimum length is " + updatedForm[id].rules['minlength'];
            updatedForm[id].error.isValid = false && isValid;
        }
        if (updatedForm[id].rules['maxlength'] && updatedForm[id].value.length > updatedForm[id].rules['maxlength']) {
            updatedForm[id].error.message = "Maximum length is " + updatedForm[id].rules['maxlength'];
            updatedForm[id].error.isValid = false && isValid;
        }

    }
    formSubmitHandler = (event) => {
        event.preventDefault();
        console.log("ordering");
        const customer = {}
        for (let i in this.state.form) {
            customer[this.state.form[i].label] = this.state.form[i].value
        }
        const order = {
            customer: customer,
            ingredients: this.props.ingrident,
            totalCount: this.props.totalCount,
            userId : this.props.userId
        }
        console.log(order,this.props);
        this.props.orderStart(order,this.props.token);
    }
    onchangeHandler = (event, id) => {
        const updatedForm = { ...this.state.form };
        updatedForm[id] = { ...this.state.form[id] };
        updatedForm[id].error = { ...this.state.form[id].error };
        updatedForm[id].value = event.target.value;
        updatedForm[id].touched = true;
        this.validate(updatedForm, id);
        this.setState({ form: updatedForm });
    }
    render() {
        let formElement = [];
        for (let input in this.state.form) {
            formElement.push({
                id: input,
                config: this.state.form[input],
            });
        }
        if (this.props.ingredients ===null || this.props.totalCount === null) {
            this.props.history.push('/');
        }

        let form = <form onSubmit={this.formSubmitHandler}>
            <h2>Enter your Contact Information</h2>
            {
                formElement.map((element) => (
                    <Input key={element.id}
                        elementconfig={element.config.elementconfig}
                        value={element.config.value}
                        label={element.config.label}
                        change={(event) => this.onchangeHandler(event, element.id)}
                        error={element.config.error}
                    />
                ))
            }
            <Buttons  type={'Success'} >Place Order</Buttons>
        </form>
        if (this.props.orderComplete===true) {
            form=<Redirect to='/' />
        }
        if(this.props.error){
            form=<p>error placing order</p>
        }
        if(this.props.loading){
            form=<Loader />
        }

        return <div className={classes.UserDetails}>
            {form}
        </div>
    }
}
const mapPropsToState = state => {
    return {
        ingrident: state.burger.ingrident,
        totalCount: state.burger.totalCount,
        error: state.order.error,
        loading:state.order.loading,
        orderComplete: state.order.orderComplete,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapPropsToDispatch= dispatch=>{
    return {
        orderStart : (order,token)=>dispatch(ActionDispatcher.orderStart(order,token))
    }
}
export default connect(mapPropsToState,mapPropsToDispatch)(withErrorHandler(UserDetails, axios));