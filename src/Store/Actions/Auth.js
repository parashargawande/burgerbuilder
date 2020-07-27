import * as ActionTypes from './ActionTypes';
import axios from '../../axios-order';

export const Login = (token,localId) => {
    return {
        type: ActionTypes.LOGIN,
        token: token,
        userId : localId
    }
}

export const startLogin = (email, password) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.AUTH_LOADING
        });
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtymW7jtmwXzaCeOCkwctSvGDSJyMGW3k', user)
            .then(response => {
                console.log(response.data);
                const expiresAt = new Date(new Date().getTime() + response.data.expiresIn*1000);
                sessionStorage.setItem('token',response.data.idToken);
                sessionStorage.setItem('expiresAt',expiresAt);
                sessionStorage.setItem('userId',response.data.localId);
                setTimeout(()=>{
                    dispatch(logout());
                },response.data.expiresIn * 1000);

                return dispatch(Login(response.data.idToken,response.data.localId));
            }).catch(err => {
                console.log(err);
                return dispatch(authError(err));
            });
    }
}
export const authError = (error) => {
    return {
        type: ActionTypes.AUTH_FAILED,
        error: error
    }
}

export const startSignup = (email, password) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.AUTH_LOADING
        });
        const user = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        console.log(user);
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtymW7jtmwXzaCeOCkwctSvGDSJyMGW3k', user)
            .then(response => {
                const expiresAt = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                sessionStorage.setItem('token',response.data.idToken);
                sessionStorage.setItem('expiresAt',expiresAt);
                sessionStorage.setItem('userId',response.data.localId);
                setTimeout(()=>{
                    dispatch(logout());
                },response.data.expiresIn * 1000);
                return dispatch(Login(response.data.idToken,response.data.localId));
            }).catch(err => {
                return dispatch(authError(err));
            });
    }
}

export const logout = () => {
    return dispatch => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expiresAt');
        return dispatch({
                type: ActionTypes.AUTH_LOGOUT
            });
    }
}

export const setReturnUrl=(url)=>{
    return {
        type : ActionTypes.AUTH_SET_RETURN_URL,
        url:url
    }
}
export const tryLogin=()=>{
    return dispatch=>{
        const token = sessionStorage.getItem('token');
        if(!token){
            return dispatch(logout());
        }else{
            const timeout= new Date(sessionStorage.getItem('expiresAt'));
            const userId= new Date(sessionStorage.getItem('userId'));
            if (timeout < new Date()) {
                return dispatch(logout);
            }else{
                setTimeout(()=>{
                    dispatch(logout());
                },timeout - new Date().getTime());
                return dispatch(Login(token,userId));
            }
        }
    }
}