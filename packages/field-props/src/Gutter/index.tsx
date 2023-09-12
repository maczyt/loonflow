import { InputNumber } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';
import { FieldPropProps } from '@loonflow/schema';

const Gutter: FC<FieldPropProps> = ({ value, onChange }) => {
  return (
    <FormItem label="区块间隔">
      <InputNumber
        min={0}
        value={value}
        onChange={(val) => {
          onChange?.(val!);
        }}
      />
    </FormItem>
  );
};

export default Gutter;
