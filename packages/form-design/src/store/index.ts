import { arrayMove } from '@loonflow/common-tools';
import { Field, FieldProp, generateNewField, IField } from '@loonflow/schema';
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

export const addField = (field: Field, index = 0) => {
  const fieldObj = generateNewField(field);
  store.fields.splice(index, 0, fieldObj);
};

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
        const newField = generateNewField(field);
        setActiveField(newField.__id__);
        return newField;
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
export const setActiveField = (id?: string) => {
  store.activeFieldId = id ?? '';
};
export const setProp = <T>(type: FieldProp, value: T) => {
  const activeField = store.fields.find(
    (field) => field.__id__ === store.activeFieldId
  );
  activeField?.props?.forEach((prop) => {
    if (prop.type === type) {
      prop.value = value;
    }
  });
};
