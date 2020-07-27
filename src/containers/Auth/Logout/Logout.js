import React, { Component } from 'react';
import * as actionDispatchers from '../../../Store/Actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        let message = <div>user logging out</div>;
        if (this.props.token == null) {
            message = <Redirect to='/' />
        }
        return (
            <div>
                {message}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        token: state.auth.token,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actionDispatchers.logout())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Logout);