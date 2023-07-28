import { Register } from '@loonflow/common-tools';
import { FieldProp } from '@loonflow/schema';
import { FC } from 'react';
import Title from './Title';

const fieldPropsFactory = new Register<FieldProp, FC>();

// register
fieldPropsFactory.set(FieldProp.title, Title);

export default fieldPropsFactory;
