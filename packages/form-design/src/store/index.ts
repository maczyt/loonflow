import { Field, generateNewField, IField } from '@loonflow/schema';
import { proxy } from 'valtio';

export const store = proxy<{
  activeFieldId: string;
  fields: IField[];
  activeField?: IField;
}>({
  activeFieldId: '',
  fields: [],
  get activeField() {
    return this.fields.find(
      (field: IField) => field.__id__ === this.activeFieldId
    );
  },
});

export const addField = (field: Field, index: number) => {
  const fieldObj = generateNewField(field);
  store.fields.splice(index, 0, fieldObj);
};
