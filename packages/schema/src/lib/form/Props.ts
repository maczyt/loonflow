import type { FormRule } from 'antd';

export enum FieldProp {
  /** 名称 */
  title = 'title',
  /** 提示文案 */
  placeholder = 'placeholder',
  /** 描述文案 */
  helper = 'helper',
  /** 栅格列 */
  span = 'span',
  /** 栅格区块间隔 */
  gutter = 'gutter',
  /** 字段标识 */
  key = 'key',
  /** 默认值 */
  default_value = 'default_value',
}

export interface FieldPropProps {
  value?: any;
  onChange?: (v: any) => void;
  disabled?: boolean;
  required?: boolean;
}

export interface Prop {
  type: FieldProp;
  value: any;
  disabled?: boolean;
  required?: boolean;
  rules?: FormRule[];
}

/**
 * 基础属性配置列表
 */
export const BasicFieldProps = [
  FieldProp.title,
  FieldProp.placeholder,
  FieldProp.helper,
  FieldProp.span,
  FieldProp.gutter,
  FieldProp.default_value,
];

/**
 * 高级属性配置列表
 */
export const AdvanceFieldProps: FieldProp[] = [FieldProp.key];
