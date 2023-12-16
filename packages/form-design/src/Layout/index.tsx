import { Box } from '@mui/system';
import { store } from '../store';
import { observer } from 'mobx-react';
import StyledContainer from './Container';

const Layout = () => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <StyledContainer
        fields={store.fields}
        droppable
        showEmpty
        sx={{
          overflow: 'auto',
          padding: '16px',
          minHeight: 'none',
        }}
        parentFieldId="__root__"
      />
    </Box>
  );
};

export default observer(Layout);
