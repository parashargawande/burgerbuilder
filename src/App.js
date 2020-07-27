import React, { Component } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import OrderConfirm from './containers/Order/OrderConfirm/OrderConfirm';
import { Route, Switch } from 'react-router-dom';
import UserDetails from './containers/Order/UserDetails/UserDetails';
import Orders from './containers/Order/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actionDispatchers from './Store/Actions/index';

class App extends Component {
  componentDidMount(){
    this.props.tryLogin();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/orderconfirm' exact component={OrderConfirm} />
            <Route path='/userdetails' exact component={UserDetails} />
            <Route path='/auth' exact component={Auth} />
            <Route path='/logout' exact component={Logout} />
            <Route path='/orders' exact component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}
const mapDispatchToProps= dispatch=>{
  return {
    tryLogin: ()=> dispatch(actionDispatchers.tryLogin())
  }
}

export default connect(null,mapDispatchToProps)(App);
