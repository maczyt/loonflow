import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const Helper: FC<FieldPropProps> = ({ value, onChange }) => {
  return (
    <FormItem label="描述">
      <Input
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      />
    </FormItem>
  );
};

export default Helper;
