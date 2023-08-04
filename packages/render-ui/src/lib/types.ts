import { CSSProperties } from '@mui/styled-engine';
import { FC, ReactNode } from 'react';

export interface IFieldProps {
  value?: any;
  onChange?: (val: any) => void;
}

export interface FactoryItem {
  component: FC<{
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
    onClick?: (ev: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  }>;
}
