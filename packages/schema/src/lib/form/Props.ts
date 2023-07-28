export enum FieldProp {
  /** 名称 */
  title = 'title',
  /** 提示文案 */
  placeholder = 'placeholder',
}

export interface TitleProp {
  value: string;
  onChange: (val: string) => void;
}
