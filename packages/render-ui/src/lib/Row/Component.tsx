import { Row, RowProps } from 'antd';
import React, { ReactNode } from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {
  children?: ReactNode;
  className?: string;
}
const RowField: React.FC<IProps & RowProps> = ({
  children,
  className,
  ...rest
}) => {
  console.log('sdfsfsdf', rest);
  return (
    <Row {...rest} className={className}>
      {children}
    </Row>
  );
};

export default RowField;
