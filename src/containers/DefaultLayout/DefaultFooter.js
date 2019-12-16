import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    const avatar = window.USERINFO.photoURL  || 'https://firebasestorage.googleapis.com/v0/b/benjamin-region-hongkong.appspot.com/o/images%2F31.jpg?alt=media';


    return (
      <React.Fragment>
  
        <span>
          <div className="avatars-stack mt-2">
            <div className="avatar avatar-xs">
              <img src={avatar} className="img-avatar" title={window.USERINFO.name} id="user-avatar" />
            </div>
          </div>
         </span>

         <span className="ml-20" id="users-activities">  </span>


        <span className="ml-auto"> &copy; 2018   Code with <i className='fa fa-heart'> </i> </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
