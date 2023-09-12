import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const Key: FC<FieldPropProps> = ({ required, disabled, value, onChange }) => {
  return (
    <FormItem label="字段标识" required={required}>
      <Input
        disabled={disabled}
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      />
    </FormItem>
  );
};

export default Key;
