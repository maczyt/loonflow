import { Input } from 'antd';
import React from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {}
const MultiTextField: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Input.TextArea
      value={value}
      onChange={(ev) => {
        console.log(ev.target.value);
        onChange?.(ev.target.value);
      }}
    />
  );
};

export default MultiTextField;
