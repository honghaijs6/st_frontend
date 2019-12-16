// HOOKS
import rolesOfNavigation from '../../hook/before/rolesOfNavigation';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';


/* lib load*/
import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';

/* Toast plugin */
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



class DefaultLayout extends Component {

  constructor(props){
    super(props)

    this.state = {
      navigation:navigation
    }

  }

  componentWillReceiveProps(newProp){

      /*window.setTimeout(()=>{
        const roles = window.USER_ROLES || [] ;
        const newNavigation = rolesOfNavigation(navigation,roles);
        this.setState({
          navigation:newNavigation
        });
        //console.log('1');

      },100)*/

  }

  componentDidMount(){

  }

  render() {


    return (
      <div className="app">

        <AppHeader fixed>
          <DefaultHeader users={this.props.users} />
        </AppHeader>

        <div className="app-body">

          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />

            <AppSidebarNav navConfig={ this.state.navigation } {...this.props} />

            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>

          <main className="main">

            {/*<AppBreadcrumb appRoutes={routes}/>*/}


            <Container fluid style={{ padding:0, marginTop:-22}}>

              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>

            </Container>

            <ToastContainer autoClose={2000} />

          </main>
          <AppAside fixed>
            <DefaultAside/>

          </AppAside>
        </div>

        {/*<AppFooter>
          <DefaultFooter />
        </AppFooter>*/}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state['users']
  }
}

export default connect(mapStateToProps)(DefaultLayout);
