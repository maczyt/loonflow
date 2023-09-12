import { Col, ColProps } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';
import type { IFieldProps } from '../types';

interface IProps extends IFieldProps {
  children?: ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  style?: CSSProperties;
}
const FieldComponent: React.FC<IProps & ColProps> = ({
  children,
  className,
  onClick,
  style,
  ...rest
}) => {
  return (
    <Col {...rest} onClick={onClick} style={style} className={className}>
      {children}
    </Col>
  );
};

export default FieldComponent;
