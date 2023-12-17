import { InputNumber } from 'antd';
import { PropComponent } from '../types';

const Gutter: PropComponent = ({ value, onChange }) => {
  return (
    <InputNumber
      min={0}
      value={value}
      onChange={(val) => {
        onChange?.(val!);
      }}
    />
  );
};

Gutter.label = '区块间隔';
export default Gutter;
