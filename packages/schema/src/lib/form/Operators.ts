import { Field } from './Field';

export enum EOperator {
  copy = 'copy',
  delete = 'delete',
  addColumn = 'addColumn',
}

const fieldOperatorsMap = new Map<Field, EOperator[]>([
  [Field.row, [EOperator.copy]],
]);
export const getOperatorsByField = (fieldType: Field) => {
  return fieldOperatorsMap.get(fieldType) ?? [];
};
