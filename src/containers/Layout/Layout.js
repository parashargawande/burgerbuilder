import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Toolbar/Toolbar';
import SidePannel from '../../components/Toolbar/SidePannel/SidePannel';
import {connect} from 'react-redux';


class Layout extends Component {
    state={
        sidePannelOpen : false
    }

    toggleSidePannel=()=>{
        this.setState((prevState,prevProops)=>({
            sidePannelOpen: !prevState.sidePannelOpen
        }));
    }
    closeSidePannel=()=>{
        this.setState({sidePannelOpen:false});
    }

    render() {
        return (
            <Aux>
                <SidePannel 
                sidePannelOpen={this.state.sidePannelOpen}
                isAuthenticated={this.props.isAuthenticated}
                closeSidePannel={this.closeSidePannel}
                ></SidePannel>
                
                <Toolbar 
                isAuthenticated={this.props.isAuthenticated}
                toggleSidePannel={this.toggleSidePannel}></Toolbar>
                {/* <div>toolbar,sidebar,backbutoon</div> */}
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
const mapStateToProps = state=>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
