import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SiderDrawer';
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  sideDrawerOpenedHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar openSide={this.sideDrawerOpenedHandler} />
        <SideDrawer
          closed={this.sideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
