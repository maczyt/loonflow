import { Input } from 'antd';
import React from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {}
const InputField: React.FC<IProps> = ({ value, onChange, placeholder }) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(ev) => {
        console.log(ev.target.value);
        onChange?.(ev.target.value);
      }}
    />
  );
};

export default InputField;
