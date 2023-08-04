import { Prop } from './Props';

export interface IField {
  __id__: string;
  type: Field;
  field?: string;
  props?: Prop[];
  children?: IField[];
}

export enum Field {
  input = 'input',
  number = 'number',
  datePicker = 'datePicker',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  textarea = 'textarea',
  attachment = 'attachment',

  /** 布局控件 */
  row = 'row',
  col = 'col',
  space = 'space',

  /** virtual */
  placeholder = 'placeholder',
}

export const FieldTitle: Partial<Record<Field, string>> = {
  [Field.input]: '单行文本',
  [Field.textarea]: '多行文本',
  [Field.row]: '行',
  [Field.col]: '列',
};
