import React, { useState } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SiderDrawer';
import { connect } from 'react-redux';
const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };
  const sideDrawerOpenedHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        openSide={sideDrawerOpenedHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={sideDrawerIsVisible}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.token !== null };
};
export default connect(mapStateToProps)(layout);
