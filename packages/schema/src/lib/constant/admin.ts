export enum FlowTabKeys {
  basic = 'basic',
  form = 'form',
  process = 'process',
  advance = 'advance',
}

export const isFlowTabKeys = (key: any): key is FlowTabKeys => {
  return [
    FlowTabKeys.basic,
    FlowTabKeys.form,
    FlowTabKeys.process,
    FlowTabKeys.advance,
  ].includes(key);
};

export const FlowTabs = [
  {
    label: '基础信息',
    key: FlowTabKeys.basic,
  },
  {
    label: '表单设计',
    key: FlowTabKeys.form,
  },
  {
    label: '流程设计',
    key: FlowTabKeys.process,
  },
  {
    label: '高级设置',
    key: FlowTabKeys.advance,
  },
];

export type IFormDesignPropError = [string, string[]];
export interface IFlowContext {
  onFormDesignErrorsChange(errorMap: Map<string, IFormDesignPropError[]>): void;
}
