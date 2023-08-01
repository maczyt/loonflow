import { Register } from '@loonflow/common-tools';
import { FieldProp } from '@loonflow/schema';
import { FC } from 'react';
import Title from './Title';

export const fieldPropsFactory = new Register<
  FieldProp,
  FC<{ value?: any; onChange?: (v: any) => void }>
>();

// register
fieldPropsFactory.set(FieldProp.title, Title);
