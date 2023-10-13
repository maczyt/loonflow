import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const Placeholder: FC<FieldPropProps> = ({ value, onChange }) => {
  return (
    <FormItem label="占位符">
      <Input
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      />
    </FormItem>
  );
};

export default Placeholder;
