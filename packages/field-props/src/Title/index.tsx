import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const Title: FC<FieldPropProps> = ({ value, onChange }) => {
  return (
    <FormItem label="名称" required>
      <Input
        value={value}
        onChange={(ev) => {
          onChange?.(ev.target.value);
        }}
      />
    </FormItem>
  );
};

export default Title;
