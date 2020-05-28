import React from 'react';
import { INPUTTYPE } from '../constants';

interface Props {
  type: string,
  name: string,
  placeholder: string,
  defaultValue: string
}

/**
 * Uncontrolled required input to be handled by the form data.
 */
const Input = (props: Props) => {
  const { type, name, placeholder, defaultValue } = props;

  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required />
    </div>
  );
}

Input.defaultProps = {
  type: INPUTTYPE,
  placeholder: '',
  defaultValue: ''
};

export default Input;
