import LogicFlow from '@logicflow/core';
import approve from './approve';
import condition from './condition';
import startEnd from './start-end';

export const registerNodes = (lf: LogicFlow) => {
  lf.batchRegister([startEnd, approve, condition]);
};
