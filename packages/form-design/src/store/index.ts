import { arrayMove } from '@loonflow/common-tools';
import { Field, generateNewField, IField } from '@loonflow/schema';
import { proxy } from 'valtio';

export const store = proxy<{
  activeFieldId: string;
  fields: IField[];
  activeField?: IField;
  placeholderField: IField | null;
  isEmpty: boolean;
  realField: IField[];
  placeholderIndex: number;
}>({
  activeFieldId: '',
  placeholderField: null,
  fields: [],
  get activeField() {
    return this.fields.find(
      (field: IField) => field.__id__ === this.activeFieldId
    );
  },
  get isEmpty() {
    return this.fields.length === 0;
  },
  get realField() {
    return this.fields.filter(
      (field: IField) => field.type !== Field.placeholder
    );
  },
  get placeholderIndex() {
    return this.fields.findIndex(
      (field: IField) => field.__id__ === store.placeholderField?.__id__
    );
  },
});

export const addField = (field: Field, index: number) => {
  const fieldObj = generateNewField(field);
  store.fields.splice(index, 0, fieldObj);
};
addField(Field.input, 0);
addField(Field.input, 1);
// addField(Field.placeholder, 1);

export const addPlaceholder = (index: number) => {
  if (!store.placeholderField) {
    store.placeholderField = generateNewField(Field.placeholder);
    store.fields.push(store.placeholderField);
  } else {
    const placeholderIndex = store.placeholderIndex;
    if (index !== placeholderIndex) {
      arrayMove(store.fields, placeholderIndex, index);
    }
  }
};

export const removePlaceholder = (field?: Field) => {
  if (field) {
    store.fields = store.fields.map((item) => {
      if (item.type === Field.placeholder) {
        return generateNewField(field);
      }
      return item;
    });
  } else {
    store.fields = store.fields.filter(
      (field) => field.type !== Field.placeholder
    );
  }
  store.placeholderField = null;
};
