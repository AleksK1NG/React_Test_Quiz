import React from 'react';
import classes from './Select.module.css';

const Select = ({ label, value, onChange, options }) => {

  const htmlFor = `${label} - ${Math.random()}`
  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{label}</label>
      <select
        onChange={onChange}
        value={value}
        name="" id={htmlFor}>
        { options.map((option, index) => {
          return (
            <option
              value={option.value}
              key={option.value + index}
            >
              {option.text}
            </option>
          )
        }) }
      </select>
    </div>
  );
};

export default Select;
