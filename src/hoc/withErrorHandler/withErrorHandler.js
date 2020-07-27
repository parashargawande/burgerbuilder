import React, { Component } from 'react';
import Model from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        componentWillMount() {
            this.reqIntecptor= axios.interceptors.request.use(req => req,error => {
                this.setState({error:null});
            });
            this.resIntecptor=axios.interceptors.response.use(response => response,error => {
                this.setState({error:error});
            });
        }
        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqIntecptor);
            axios.interceptors.response.eject(this.resIntecptor);
        }
        cancelModel=()=>{
            this.setState({error : null});
        }
        render() {
            return (
                <Aux>
                    <Model cancelOrder={this.cancelModel} show={this.state.error !== null}>
                        {this.state.error ? this.state.error.message: null}
                    </Model>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
