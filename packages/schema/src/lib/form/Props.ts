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
