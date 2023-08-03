import { FieldProp, IField } from '@loonflow/schema';
import { useMemo } from 'react';

export const useLabel = (field: IField) => {
  return useMemo(() => {
    return (
      field.props?.find((prop) => prop.type === FieldProp.title)?.value ?? ''
    );
  }, [field.props]);
};
