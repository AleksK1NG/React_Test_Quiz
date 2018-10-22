import React from 'react';
import classes from './Button.module.css';

const Button = ({ children, onClick, disabled, type }) => {

  const cls = [
    classes.Button,
    classes[type]
  ]

  return (
    <button
      disabled={disabled}
      className={cls.join(' ')}
      onClick={onClick}
    >
      { children }
    </button>
  );
};

export default Button;
