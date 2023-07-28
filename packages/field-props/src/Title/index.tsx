import { Input } from 'antd';
import { FC } from 'react';
import FormItem from '../FormItem';

const Title: FC<{
  value?: string;
  onChange?: (val: string) => void;
}> = ({ value, onChange }) => {
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
