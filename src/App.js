
import './App.scss';
import './scss/filemanager.scss';
import './scss/ubuntu-style.scss';


import React, { Component } from 'react';
import { connect } from 'react-redux';

/*import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */
import { HashRouter, Route, Switch } from 'react-router-dom';


// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, PushSDK, DemoTicket } from './pages/pages';
import socket from './model/socket';

// HOOKED ;

import doGetModelInfo from './hook/ultil/doGetModelInfo' ;
import doFindAll from './hook/ultil/doFindAll';

import { preLoad } from './hook/before';


class App extends Component {

  constructor(props){
      super(props);

      this.state = {
        login:false,
        count:0
      }


  }

  async _getUserInfo(login,id){
    const res = await doGetModelInfo('users',id) ;
    window.USERINFO = res.name === 'success' ? res.data : {};

    // DISPATCH TO USERS : save user info
    this.props.saveUserInfo(res.data);


    this._getUserRoles(window.USERINFO.email)
    this.setState({login});
  }

  async _getUserRoles(email){
    const res = await doFindAll('user_roles',email);
    if(res.name==='success'){
      window.USER_ROLES = res.rows;

      // SAVE USER_ROLS TO REDUX
      this.props.saveUserRoles(res.rows);

      this.setState({
        user_roles:window.USER_ROLES
      })
    }
  }

  componentDidMount(){

    preLoad('authenticate');
    socket.client.authenticate().catch((err)=>{

      preLoad('stop');
      this.setState({login:false})

    });

    socket.client.on('authenticated',login=>{

      preLoad('stop');

      socket.client.passport.verifyJWT(login.accessToken).then(res=>{


        this._getUserInfo(login,res.userId)


      })

    });


    socket.client.on('logout', ()=>{
      preLoad('stop');
      this.setState({login:false})
    });

  }


  render() {


      return (
        <HashRouter>

            <Switch>
              <Route  path="/404" name="Page 404" component={Page404} />
              <Route path="/500" name="Page 500" component={Page500} />
              <Route path='/pushsdk' name="Push SDK" component={PushSDK} />
              <Route path='/demoticket' name="Demo Ticket" component={ DemoTicket } />
              <Route path={ '/'  } name="Home" component={ this.state.login ? DefaultLayout : Login } />

            </Switch>
        </HashRouter>
      );


    //return <Login/>

  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfo: (info) => {
      dispatch({
        type:'SAVE_USER',
        info:info
      });
    },
    saveUserRoles:(roles)=>{
      dispatch({
        type:'SAVE_USER_ROLE',
        userRoles:roles
      })
    }
  }
}

export default connect(null,mapDispatchToProps)(App);
