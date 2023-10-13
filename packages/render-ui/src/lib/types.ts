import { CSSProperties } from '@mui/styled-engine';
import { FC, ReactNode } from 'react';

export interface IFieldProps {
  value?: any;
  onChange?: (val: any) => void;

  placeholder?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface FactoryItem {
  component: FC<IFieldProps>;
}
