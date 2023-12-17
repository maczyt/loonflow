import { FieldPropProps } from '@loonflow/schema';
import { FC } from 'react';

export type PropComponent = FC<FieldPropProps> & {
  label: string;
};
