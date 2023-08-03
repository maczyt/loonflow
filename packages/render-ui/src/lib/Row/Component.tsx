import { Row } from 'antd';
import React, { ReactNode } from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {
  children?: ReactNode;
  className?: string;
}
const RowField: React.FC<IProps> = ({ children, className }) => {
  return <Row className={className}>{children}</Row>;
};

export default RowField;
