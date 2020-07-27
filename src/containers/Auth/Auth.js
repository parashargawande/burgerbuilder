import React, { Component } from 'react';
import * as classes from './Auth.module.css';
import Buttons from '../../components/UI/Buttons/Buttons';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import {connect} from 'react-redux';
import * as actionDispatchers from '../../Store/Actions/index.js';

class Auth extends Component {

    state = {
        loginForm: {
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
            password: {
                label: 'Password',
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: "Enter Password"
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
        },
        signupForm: {
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
            password: {
                label: 'Password',
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: "Enter Password"
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
            cnfpassword: {
                label: 'Password',
                elementtype: 'input',
                elementconfig: {
                    type: 'password',
                    placeholder: "Re-Enter Password"
                },
                value: '',
                rules: {
                    required: true,
                    sameAs: 'password'
                },
                error: {
                    isValid: true,
                    message: ''
                },
                touched: false
            },
        },
        isLogin: true
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
        if (updatedForm[id].rules['sameAs'] && updatedForm[id].value !== updatedForm[updatedForm[id].rules['sameAs']].value) {
            updatedForm[id].error.message = "should match with " + updatedForm[id].rules['sameAs'];
            updatedForm[id].error.isValid = false && isValid;
        }

    }
    formSubmitHandler = (event) => {
        event.preventDefault();
        let isValid=true;
        let formControl = this.state.isLogin ? this.state.loginForm : this.state.signupForm;
        for (let input in formControl) {
                this.validate(formControl,input);
                isValid = formControl[input].error.isValid && isValid;
        }
        if (this.state.isLogin) {
            this.setState({ loginForm: formControl });
        } else {
            this.setState({ signupForm: formControl });
        }
        if (isValid) {
            if (this.state.isLogin) {
                this.props.startlogin(this.state.loginForm.email.value,this.state.loginForm.password.value);
            }else{
                this.props.startSignup(this.state.signupForm.email.value,this.state.signupForm.password.value);
            }
        }
    }
    onchangeHandler = (event, id) => {
        let updatedForm = {};
        if (this.state.isLogin) {
            updatedForm = { ...this.state.loginForm };
            updatedForm[id] = { ...this.state.loginForm[id] };
            updatedForm[id].error = { ...this.state.loginForm[id].error };
        } else {
            updatedForm = { ...this.state.signupForm };
            updatedForm[id] = { ...this.state.signupForm[id] };
            updatedForm[id].error = { ...this.state.signupForm[id].error };
        }

        updatedForm[id].value = event.target.value;
        updatedForm[id].touched = true;

        this.validate(updatedForm, id);

        if (this.state.isLogin) {
            this.setState({ loginForm: updatedForm });
        } else {
            this.setState({ signupForm: updatedForm });
        }
    }
    toggleLogin = () => {
        this.setState((state) => {
            return {
                ...state,
                isLogin: !state.isLogin
            }
        })
    }
    render() {
        let formElement = [];
        let formControl = this.state.isLogin ? this.state.loginForm : this.state.signupForm;
        for (let input in formControl) {
            formElement.push({
                id: input,
                config: formControl[input],
            });
        }
        if (this.props.ingredients === null || this.props.totalCount === null) {
            this.props.history.push('/');
        }

        let form = <form onSubmit={this.formSubmitHandler} className={classes.Form}>
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
            <Buttons type={'Success'} >Submit</Buttons>
        </form>
        if (this.props.token !== null) {
            if (this.props.returnUrlPath !== '/') {
                form = <Redirect to={this.props.returnUrlPath} />
            }else{
                form = <Redirect to='/' />
            }
        }

        
        if (this.props.error) {
            form = <p>login error</p>
        }
        if (this.props.loading) {
            form = <Loader />
        }

        return (<div className={classes.Auth}>
            <div className={classes.ToggleBar}>
                <div onClick={this.toggleLogin} className={this.state.isLogin ? [classes.Toggle, classes.active].join(' ') : classes.Toggle}><h3>Login</h3></div>
                <div onClick={this.toggleLogin} className={this.state.isLogin ? classes.Toggle : [classes.Toggle, classes.active].join(' ')}><h3>Signup</h3></div>
            </div>
            {form}
        </div>);
    }
}
const mapStateToProps=state=>{
    return {
        loading: state.auth.loading,
        token: state.auth.token,
        returnUrlPath: state.auth.returnUrlPath
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        startlogin : (email,password)=> dispatch(actionDispatchers.startLogin(email,password)),
        startSignup: (email,password)=> dispatch(actionDispatchers.startSignup(email,password))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);