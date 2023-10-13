import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const DefaultValue: FC<FieldPropProps> = ({ value, onChange }) => {
  return (
    <FormItem label="默认值">
      <Input
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      />
    </FormItem>
  );
};

export default DefaultValue;
