import { InputNumber } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';

const Span: FC<{
  value?: number;
  onChange?: (val: number) => void;
}> = ({ value, onChange }) => {
  return (
    <FormItem label="格数">
      <InputNumber
        min={1}
        max={24}
        value={value}
        onChange={(val) => {
          onChange?.(val!);
        }}
      />
    </FormItem>
  );
};

export default Span;
