import LogicFlow from '@logicflow/core';
import startEnd from './start-end';

export const registerNodes = (lf: LogicFlow) => {
  lf.register(startEnd);
};
