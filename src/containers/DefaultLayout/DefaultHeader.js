import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg' ;

import { Link } from 'react-router-dom';
import Socket from '../../model/socket';

import BenDropDown from '../../components/BenDropDown';


const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props){
    super(props);

    this.state = {
      userInfo:{}
    }

    this._logout = this._logout.bind(this);

  }

  _logout(){

    Socket.client.logout();

  }
  componentDidMount(){
 
    this.setState({
      userInfo:window.USERINFO
    });


  }


  render() {

    // eslint-disable-next-line
    const { children, users, ...attributes } = this.props;
    const userInfo = users.info;

    const avatar = userInfo.photoURL  || 'https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2F31.jpg?alt=media';


    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo,  height: 45 }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* LEFT  */}
        <Nav navbar>
          <NavItem className="px-3">
              Tháng 06
          </NavItem>
        </Nav>


        {/* RIGHT */}
        <Nav className="ml-auto" navbar>

          
          <AppHeaderDropdown className="px-3  " direction="down">

            <DropdownToggle nav>
              <img src={avatar} className="img-avatar" /> 
              <span className="caret"> 
                { userInfo.name }
                <i className="ml-10 fa fa-caret-down"></i>
              </span>
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>

              <DropdownItem>
                <Link to="/profile">
                  <i className="fa fa-user"></i> Tài khoản
                </Link>
              </DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Thiết lập </DropdownItem>

              <DropdownItem onClick={this._logout} ><i className="fa fa-lock"></i> Đăng xuất </DropdownItem>
            </DropdownMenu>

          </AppHeaderDropdown>

          <NavItem className="d-md-down-none">
            

            <BenDropDown style={{
              background:'transparen',
              border:0
            }} icon={
              <NavLink href="#"><i className="font-18 fa fa-globe"></i>
                <Badge style={{paddingTop:'3px'}} color="danger">1</Badge>
              </NavLink>
            }> 
              <ul className="nav">
                  <li>
                     <div 
                        style={{
                          float:'left',
                          width:50
                        }}
                     >
                        <img  className="img-avatar" src="https://i.imgur.com/khg4WBZ.png" /> 
                     </div>
                     <div style={{
                        float:'left',
                        marginLeft:10   
                     }}>
                       <h6> adasdas </h6> 
                       <p>adasdasd</p>
                     </div>
                     <div style={{clear:'both'}}></div>
                  </li>
              </ul>
            </BenDropDown>
          </NavItem>
          
        </Nav>

        <AppAsideToggler className="d-md-down-none" />

        {<AppAsideToggler className="d-lg-none" mobile />}

      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
