import {
  Field,
  FieldProp,
  generateFieldId,
  generateFieldKey,
  generateNewField,
  IField,
  Prop,
} from '@loonflow/schema';
import { configure, makeAutoObservable, toJS } from 'mobx';
import { DragItem } from '../types';

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

  get fieldsData() {
    return toJS(this.fields);
  }

  get fieldsOptions() {
    return this.fields.map((field) => {
      const label = field.props?.find(
        (prop) => prop.type === FieldProp.title
      )?.value;
      return {
        label: label ?? field.__id__,
        value: field.__id__,
      };
    });
  }
}

export const store = new DesignStore();

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
/**
 * 获取field所在的列表
 * @param field
 * @returns
 */
export const getFieldAtFields = (field: IField) => {
  let targetFields: IField[] = [];
  const find = (fields: IField[]) => {
    const index = fields.findIndex((f) => f.__id__ === field.__id__);
    if (index > -1) {
      targetFields = fields;
      return;
    }
    fields.forEach((f) => {
      if (f.children && f.children.length > 0) {
        find(f.children);
      }
    });
  };
  find(store.fields);
  return targetFields;
};

const _copyField = (field: IField) => {
  const copyProp = (prop: Prop, field: IField): Prop => {
    if (prop.type === FieldProp.key)
      return {
        ...prop,
        value: generateFieldKey(field.type),
      };
    return {
      ...prop,
    };
  };
  // TODO: 增强属性配置
  const copy = (field: IField): IField => {
    return {
      ...field,
      __id__: generateFieldId(),
      // field: generateFieldKey(field.type),
      children: field.children?.map((child) => copy(child)),
      props: field.props?.map((prop) => copyProp(prop, field)),
    };
  };
  return copy(field);
};

/*********** operators  ************/
export const copyField = (field: IField) => {
  const fields = getFieldAtFields(field);
  const index = fields.findIndex((fd) => fd.__id__ === field.__id__);
  fields.splice(index + 1, 0, _copyField(field));
};
export const deleteField = (field: IField) => {
  const fields = getFieldAtFields(field);
  const index = fields.findIndex((fd) => fd.__id__ === field.__id__);
  fields.splice(index, 1);
};
export const addColumnField = (rowField: IField) => {
  if (!rowField.children) {
    rowField.children = [];
  }
  rowField.children.push(generateNewField(Field.col));
};
