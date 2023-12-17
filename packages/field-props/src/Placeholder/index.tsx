import { Input } from 'antd';
import { PropComponent } from '../types';

const Placeholder: PropComponent = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={(ev) => {
        onChange?.(ev.target.value);
      }}
    />
  );
};
Placeholder.label = '占位符';
export default Placeholder;
