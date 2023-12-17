import { InputNumber } from 'antd';
import { PropComponent } from '../types';

const Span: PropComponent = ({ value, onChange }) => {
  return (
    <InputNumber
      min={1}
      max={24}
      value={value}
      onChange={(val) => {
        onChange?.(val!);
      }}
    />
  );
};

Span.label = '格数';

export default Span;
