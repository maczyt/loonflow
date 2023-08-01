import { Prop } from './Props';

export interface IField {
  __id__?: string;
  type: Field;
  field?: string;
  props?: Prop[];
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

  /** virtual field */
  placeholder = 'placeholder',
}

export const FieldTitle: Partial<Record<Field, string>> = {
  [Field.input]: '单行文本',
};
