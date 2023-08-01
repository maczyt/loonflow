export enum FieldProp {
  /** 名称 */
  title = 'title',
  /** 提示文案 */
  placeholder = 'placeholder',
  /** 描述文案 */
  helper = 'helper',
}

export interface Prop {
  type: FieldProp;
  value: any;
}

/**
 * 基础属性配置列表
 */
export const BasicFieldProps = [
  FieldProp.title,
  FieldProp.placeholder,
  FieldProp.helper,
] as const;

/**
 * 高级属性配置列表
 */
export const AdvanceFieldProps: FieldProp[] = [];
