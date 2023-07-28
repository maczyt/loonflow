export interface IField {
  type: string;
  // props: {};
  title: string;
  field: string;
}

export const input: IField = {
  type: 'input',
  title: '输入框',
  field: '',
};

export enum Field {
  input = 'input',
  number = 'number',
  datePicker = 'datePicker',
  radio = 'radio',
  checkbox = 'checkbox',
  select = 'select',
  textarea = 'textarea',
  attachment = 'attachment',
}
