import { Input } from 'antd';
import { PropComponent } from '../types';

const DefaultValue: PropComponent = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={(ev) => {
        onChange?.(ev.target.value);
      }}
    />
  );
};
DefaultValue.label = '默认值';
export default DefaultValue;
