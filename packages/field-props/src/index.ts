import { Register } from '@loonflow/common-tools';
import { FieldProp, FieldPropProps } from '@loonflow/schema';
import { FC } from 'react';
import Title from './Title';
import Span from './Span';
import Gutter from './Gutter';
import Key from './Key';

export const fieldPropsFactory = new Register<FieldProp, FC<FieldPropProps>>();

// register
fieldPropsFactory.set(FieldProp.title, Title);
fieldPropsFactory.set(FieldProp.span, Span);
fieldPropsFactory.set(FieldProp.gutter, Gutter);
fieldPropsFactory.set(FieldProp.key, Key);
