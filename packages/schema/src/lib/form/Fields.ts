import { Field, IField } from './Field';
import { FieldProp } from './Props';
import { Register } from '@loonflow/common-tools';
import { uid } from 'uid';

export const generateFieldId = () => `field-${uid()}`;
export const generateFieldKey = (prefix: string) => `${prefix}-${uid()}`;

export const fieldGeneratorFactory = new Register<Field, () => IField>();
fieldGeneratorFactory.set(Field.input, () => ({
  type: Field.input,
  field: generateFieldKey('input'),
  __id__: generateFieldId(),
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
}));
fieldGeneratorFactory.set(Field.textarea, () => ({
  type: Field.textarea,
  field: generateFieldKey('textarea'),
  __id__: generateFieldId(),
  props: [
    {
      type: FieldProp.title,
      value: '多行文本',
    },
    {
      type: FieldProp.placeholder,
      value: '',
    },
  ],
}));
fieldGeneratorFactory.set(Field.col, () => ({
  type: Field.col,
  __id__: generateFieldId(),
  children: [],
}));
fieldGeneratorFactory.set(Field.row, () => ({
  type: Field.row,
  __id__: generateFieldId(),
  children: [fieldGeneratorFactory.get(Field.col)?.()].filter(
    (v): v is IField => Boolean(v)
  ),
}));
fieldGeneratorFactory.set(Field.placeholder, () => ({
  type: Field.placeholder,
  __id__: generateFieldId(),
}));

export const generateNewField = (field: Field): IField => {
  const generator = fieldGeneratorFactory.get(field);
  if (generator) {
    return generator();
  }
  throw new TypeError('No Specific Field: ' + field);
};
