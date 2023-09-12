import { Register } from '@loonflow/common-tools';
import { FieldProp } from '@loonflow/schema';
import { FC } from 'react';
import Title from './Title';
import Span from './Span';
import Gutter from './Gutter';

export const fieldPropsFactory = new Register<
  FieldProp,
  FC<{ value?: any; onChange?: (v: any) => void }>
>();

// register
fieldPropsFactory.set(FieldProp.title, Title);
fieldPropsFactory.set(FieldProp.span, Span);
fieldPropsFactory.set(FieldProp.gutter, Gutter);
