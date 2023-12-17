import { Input } from 'antd';
import { PropComponent } from '../types';

const Title: PropComponent = ({ value, onChange }) => {
  return (
    <Input
      value={value}
      onChange={(ev) => {
        onChange?.(ev.target.value);
      }}
    />
  );
};

Title.label = '名称';

export default Title;
