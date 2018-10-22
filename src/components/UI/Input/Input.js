import React from 'react';
import classes from './Input.module.css';




const isInvalid = (valid, touched, shouldValidate) => {
  return !valid && touched && shouldValidate
}

const Input = ({ type, label, value, onChange, errorMessage, valid, touched, shouldValidate }) => {
  const inputType = type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType} - ${Math.random()}`;


  if (isInvalid(valid, touched, shouldValidate)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        id={htmlFor}
        className={cls.join(' ')}
        type={inputType}
      />

      { isInvalid(valid, touched, shouldValidate) ? <span>{errorMessage || 'Enter the password'}</span> : null }

    </div>
  );
};

export default Input;
