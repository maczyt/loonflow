import { FC } from 'react';

export interface IFieldProps {
  value?: any;
  onChange?: (val: any) => void;
}

export interface FactoryItem {
  component: FC;
}
