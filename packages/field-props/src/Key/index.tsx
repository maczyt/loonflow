import { Input } from 'antd';
import { PropComponent } from '../types';

const Key: PropComponent = ({ required, disabled, value, onChange }) => {
  return (
    <Input
      disabled={disabled}
      value={value}
      onChange={(ev) => {
        onChange?.(ev.target.value);
      }}
    />
  );
};
Key.label = '字段标识';
export default Key;
