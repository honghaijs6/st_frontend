import React, { Component } from 'react';
import { Nav, NavItem, NavLink, Progress, TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppSwitch } from '@coreui/react'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultAside extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;


    return (
      <React.Fragment>
        <Nav tabs>

          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '1' })}
                     onClick={() => {
                       this.toggle('1');
                     }}>
              <i className="icon-list"></i>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '2' })}
                     onClick={() => {
                       this.toggle('2');
                     }}>
              <i className="icon-note"></i>
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink className={classNames({ active: this.state.activeTab === '3' })}
                     onClick={() => {
                       this.toggle('3');
                     }}>
              <i className="icon-eye"></i>
            </NavLink>
          </NavItem>

        </Nav>



        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">

            <ListGroup className="list-group-accent" tag={'div'}>




              <ListGroupItem className="font-weight-bold text-muted text-uppercase small">Tasks</ListGroupItem>

              <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                <div>New UI Project - <strong>deadline</strong></div>
                <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
                <small className="text-muted"><i className="icon-home"></i>&nbsp; VIKANG CO.,ltd</small>

              </ListGroupItem>


            </ListGroup>
          </TabPane>


          <TabPane tabId="2" className="p-3">
            <h6 className="font-weight-bold text-muted text-uppercase small"> Ghi Chú </h6>
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Hồng Hải</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Task notification nhận</div>
              <small className="text-muted">
              Mẫu notification task làm việc theo assign đã nhận được
              </small>
            </div>
            <hr />
            <div className="message">
              <div className="py-3 pb-5 mr-3 float-left">
                <div className="avatar">
                  <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  <span className="avatar-status badge-success"></span>
                </div>
              </div>
              <div>
                <small className="text-muted">Hồng Hải</small>
                <small className="text-muted float-right mt-1">1:52 PM</small>
              </div>
              <div className="text-truncate font-weight-bold">Task notification nhận</div>
              <small className="text-muted">
              Mẫu notification task làm việc theo assign đã nhận được
              </small>
            </div>
            <hr />

          </TabPane>

          <TabPane tabId="3" className="p-3">
            <h6 className="font-weight-bold text-muted text-uppercase small"> Smart Office </h6>

            <div className="aside-options">
              <div className="clearfix mt-4">
                <small><b>Option 1</b></small>
                <AppSwitch className={'float-right'} variant={'pill'} label color={'success'} defaultChecked size={'sm'}/>
              </div>
              <div>
                <small className="text-muted">Task notification nhận,   
                Mẫu notification task làm việc theo assign đã nhận được
                </small>
              </div>
            </div>

            <hr />

          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

DefaultAside.propTypes = propTypes;
DefaultAside.defaultProps = defaultProps;

export default DefaultAside;
