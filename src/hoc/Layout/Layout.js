import React, { Component } from 'react';
import classes from './Layout.module.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {
  state = {
    menu: false
  };

  toggleMenuHandler = () => {
    this.setState({ menu: !this.state.menu });
  };

  menuCloseHandler = () => {
    this.setState({ menu: false });
  };

  render() {
    const { menu } = this.state;
    const { isAuthenticated } = this.props;
    return (
      <div className={classes.Layout}>
        <Drawer
          onClose={this.menuCloseHandler}
          isOpen={menu}
          isAuthenticated={isAuthenticated}
        />
        <MenuToggle onToggle={this.toggleMenuHandler} isOpen={menu} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: !!state.auth.token
});

export default connect(mapStateToProps)(Layout);
