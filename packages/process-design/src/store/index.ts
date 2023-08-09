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
  settingOpen = false;
  constructor() {
    makeAutoObservable(this);
  }

  assign<T extends keyof ProcessStore>(value: Record<T, ProcessStore[T]>) {
    Object.assign(this, value);
  }
}

export const ProcessDesignStore = new ProcessStore();
