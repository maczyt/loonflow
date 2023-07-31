import { FieldProp, Prop } from './Props';

export interface IField {
  type: string;
  field: string;
  props: Prop[];
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

export const InputField = (): IField => {
  return {
    type: Field.input,
    field: '',
    props: [
      {
        type: FieldProp.title,
        value: '单行文本',
      },
      {
        type: FieldProp.placeholder,
        value: '',
      },
    ],
  };
};
