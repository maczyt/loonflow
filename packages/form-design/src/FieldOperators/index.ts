import { Register } from '@loonflow/common-tools';
import { EOperator, IField } from '@loonflow/schema';
import { FC } from 'react';
import Copy from './Copy';

export const fieldOperatorsFactory = new Register<
  EOperator,
  FC<{ field: IField }>
>();

// register
fieldOperatorsFactory.set(EOperator.copy, Copy);
