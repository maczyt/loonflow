import { Register } from '@loonflow/common-tools';
import { FieldProp, FieldPropProps } from '@loonflow/schema';
import { FC } from 'react';
import Title from './Title';
import Span from './Span';
import Gutter from './Gutter';
import Key from './Key';
import Helper from './Helper';
import Placeholder from './Placeholder';
import DefaultValue from './DefaultValue';

export const fieldPropsFactory = new Register<
  FieldProp,
  FC<FieldPropProps> & {
    label: string;
  }
>();

// register
fieldPropsFactory.set(FieldProp.title, Title);
fieldPropsFactory.set(FieldProp.span, Span);
fieldPropsFactory.set(FieldProp.gutter, Gutter);
fieldPropsFactory.set(FieldProp.key, Key);
fieldPropsFactory.set(FieldProp.helper, Helper);
fieldPropsFactory.set(FieldProp.placeholder, Placeholder);
fieldPropsFactory.set(FieldProp.default_value, DefaultValue);
