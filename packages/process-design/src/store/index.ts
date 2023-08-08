import LogicFlow from '@logicflow/core';
import { configure, makeAutoObservable } from 'mobx';

let lf: LogicFlow | null = null;

export const setLoginFlow = (instance: LogicFlow) => {
  lf = instance;
};

export const getLogicFlow = () => lf;

configure({
  enforceActions: 'never',
});

class ProcessStore {
  activeNodeId = '';
  constructor() {
    makeAutoObservable(this);
  }
}

export const ProcessDesignStore = new ProcessStore();
