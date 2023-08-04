import { Field, generateNewField, IField } from '@loonflow/schema';
import { configure, makeAutoObservable, toJS } from 'mobx';
import { DragItem } from '../types';
import { injectStores } from '@mobx-devtools/tools';

configure({
  enforceActions: 'never',
});
class DesignStore {
  activeFieldId = '';
  fields: IField[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get flattenFields() {
    const map: Record<string, IField> = Object.create(null);
    const flatten = (fields: IField[]) => {
      fields.forEach((field) => {
        map[field.__id__] = field;
        if (field.children) {
          flatten(field.children);
        }
      });
    };
    flatten(this.fields);
    return map;
  }

  get activeField() {
    return this.flattenFields[this.activeFieldId];
  }

  get isEmpty() {
    return this.fields.length === 0;
  }
}

export const store = new DesignStore();

injectStores({
  store,
});

export const setActiveId = (id: string) => {
  store.activeFieldId = id;
};
export const addNewField = (type: Field, index = 0, fields: IField[]) => {
  const field = generateNewField(type);
  fields.splice(index, 0, field);
  setActiveId(field.__id__);
};
export const addField = (field: IField, index = 0, fields: IField[]) => {
  fields.splice(index, 0, field);
  setActiveId(field.__id__);
};
export const removeField = (field: IField) => {
  const remove = (fields: IField[]) => {
    const index = fields.findIndex((f) => f.__id__ === field.__id__);
    if (index > -1) {
      fields.splice(index, 1);
    }
    fields.forEach((f) => {
      if (f.children && f.children.length > 0) {
        remove(f.children);
      }
    });
  };
  remove(store.fields);
  if (store.activeFieldId === field.__id__) {
    store.activeFieldId = '';
  }
};
export const findFieldIndexInFieldsById = (
  id?: string,
  fields: IField[] = []
) => {
  const index = fields.findIndex((field) => field.__id__ === id);
  return index === -1 ? fields.length : index;
};
export const addOrMoveField = (
  fields: IField[],
  item: DragItem,
  nextId?: string
) => {
  if (item.field) {
    // remove old
    removeField(item.field);
    const index = findFieldIndexInFieldsById(nextId, fields);
    addField(item.field, index, fields);
  } else {
    // add
    const index = findFieldIndexInFieldsById(nextId, fields);
    addNewField(item.type, index, fields);
  }
};

console.log('store', store);
(window as any).toJs = toJS;
(window as any).store = store;
