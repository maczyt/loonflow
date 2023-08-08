import { RegisterConfig } from '@logicflow/core';
import { NodeType } from '@loonflow/schema';
import Model from './model';
import View from './view';

export default {
  type: NodeType.startEnd,
  model: Model,
  view: View,
} as RegisterConfig;
