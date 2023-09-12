import { IField, getOperatorsByField } from '@loonflow/schema';
import { Box } from '@mui/system';
import { FC, useMemo } from 'react';
import { fieldOperatorsFactory } from '.';

const FieldOperators: FC<{
  field: IField;
}> = ({ field }) => {
  const operators = useMemo(() => {
    return getOperatorsByField(field.type);
  }, [field.type]);
  return (
    <Box
      sx={{
        display: 'flex',
        gap: '4px',
      }}
    >
      {operators.map((op) => {
        const Comp = fieldOperatorsFactory.get(op);
        if (Comp) {
          return <Comp field={field} key={op} />;
        }
        return null;
      })}
    </Box>
  );
};

export default FieldOperators;
