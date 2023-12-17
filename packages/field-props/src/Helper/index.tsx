import { Input } from 'antd';
import { PropComponent } from '../types';

const Helper: PropComponent = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={(ev) => {
        onChange?.(ev.target.value);
      }}
    />
  );
};
Helper.label = '描述';
export default Helper;
