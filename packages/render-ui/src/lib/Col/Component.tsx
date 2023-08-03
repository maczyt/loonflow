import { Col } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: CSSProperties;
}
const FieldComponent: React.FC<IProps> = ({
  children,
  className,
  onClick,
  style,
}) => {
  return (
    <Col onClick={onClick} style={style} span={24} className={className}>
      {children}
    </Col>
  );
};

export default FieldComponent;
