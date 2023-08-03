import { Field, IField } from '@loonflow/schema';

export enum DnDTypes {
  box = 'box',
}

export interface DragItem {
  type: Field;
  index?: number;
  sortable?: true;
  id?: string;
  field?: IField;
}
