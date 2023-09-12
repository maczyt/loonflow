import { InputNumber } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';

const Gutter: FC<{
  value?: number;
  onChange?: (val: number) => void;
}> = ({ value, onChange }) => {
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
