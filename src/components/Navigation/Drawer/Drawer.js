import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = links => {
    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          onClick={this.clickHandler}
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  };

  render() {
    const { isOpen, onClose, isAuthenticated } = this.props;
    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close);
    }

    const links = [{ to: '/', label: 'All Tests', exact: true }];

    if (isAuthenticated) {
      links.push({ to: '/quiz-creator', label: 'Create test', exact: false });
      links.push({ to: '/logout', label: 'Logout', exact: false });
    } else {
      links.push({ to: '/auth', label: 'Login/Register', exact: false });
    }

    return (
      <React.Fragment>
        {isOpen ? <Backdrop onClick={onClose} /> : null}
        <nav className={cls.join(' ')}>
          <ul>{this.renderLinks(links)}</ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default Drawer;
