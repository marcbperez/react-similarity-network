import React from 'react';
import { INPUTTYPE } from '../constants';

interface Props {
  type: string,
  name: string,
  placeholder: string,
  defaultValue: string
}

const Input = (props: Props) => {
  return (
    <div><input required { ...props } /></div>
  );
}

Input.defaultProps = {
  type: INPUTTYPE,
  placeholder: '',
  defaultValue: ''
};

export default Input;
