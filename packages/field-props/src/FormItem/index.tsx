import { Form } from 'antd';
import type { ReactNode } from 'react';

interface IFormItemProps {
  label?: ReactNode;
  tooltip?: ReactNode;
  required?: boolean;
  children?: ReactNode;
}
const FormItem: React.FC<IFormItemProps> = ({
  label,
  tooltip,
  required,
  children,
}) => {
  return (
    <Form.Item label={label} tooltip={tooltip} required={required}>
      {children}
    </Form.Item>
  );
};

export default FormItem;
