import { Field, IField } from './Field';
import { FieldProp } from './Props';
import { Register } from '@loonflow/common-tools';
import { uid } from 'uid';

export const fieldGeneratorFactory = new Register<Field, () => IField>();
fieldGeneratorFactory.set(Field.input, () => ({
  type: Field.input,
  field: `input-${uid()}`,
  __id__: `field-${uid()}`,
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
fieldGeneratorFactory.set(Field.placeholder, () => ({
  type: Field.placeholder,
  __id__: `field-${uid()}`,
}));

export const generateNewField = (field: Field): IField => {
  const generator = fieldGeneratorFactory.get(field);
  if (generator) {
    return generator();
  }
  throw new TypeError('No Specific Field: ' + field);
};
