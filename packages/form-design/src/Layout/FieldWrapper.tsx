import { IField } from '@loonflow/schema';
import { Box, SxProps } from '@mui/system';
import { observer } from 'mobx-react';
import { FC, ReactNode } from 'react';
import { setActiveId, store } from '../store';

const FieldWrapper: FC<{
  children?: ReactNode;
  sx?: SxProps;
  field: IField;
  hideBackdrop?: boolean;
}> = ({ children, sx, field, hideBackdrop }) => {
  const active = store.activeFieldId === field?.__id__;
  return (
    <Box
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setActiveId(field.__id__);
      }}
      sx={{
        padding: '8px',
        outline: active ? `2px solid #2e73ff` : `1px dashed #2e73ff`,
        position: 'relative',
        cursor: 'pointer',
        ...sx,
      }}
    >
      {children}
      {hideBackdrop ? null : (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
        />
      )}
    </Box>
  );
};

export default observer(FieldWrapper);
