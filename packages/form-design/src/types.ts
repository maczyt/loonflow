import { Field } from '@loonflow/schema';

export enum DnDTypes {
  box = 'box',
}

export interface DragItem {
  index?: number;
  sortable?: true;
  type?: Field;
}
