import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import MyButton from '../util/MyButton';
import { Add, Home, Notifications } from '@material-ui/icons';

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar>
        <Toolbar className='nav-container'>
          {authenticated ? (
            <Fragment>
              <MyButton tip='Create Post!'>
                <Add />
              </MyButton>
              <MyButton tip='Home'>
                <Link to='/'>
                  <Home />
                </Link>
              </MyButton>
              <MyButton tip='Notifications'>
                <Notifications />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button color='inherit' component={Link} to='/login'>Login</Button>
              <Button color='inherit' component={Link} to='/'>Home</Button>
              <Button color='inherit' component={Link} to='/signup'>Signup</Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
