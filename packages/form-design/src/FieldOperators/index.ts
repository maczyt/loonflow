import { Register } from '@loonflow/common-tools';
import { EOperator, IField } from '@loonflow/schema';
import { FC } from 'react';
import Copy from './Copy';
import Delete from './Delete';
import AddColumn from './AddColumn';

export const fieldOperatorsFactory = new Register<
  EOperator,
  FC<{ field: IField }>
>();

// register
fieldOperatorsFactory.set(EOperator.copy, Copy);
fieldOperatorsFactory.set(EOperator.delete, Delete);
fieldOperatorsFactory.set(EOperator.addColumn, AddColumn);
