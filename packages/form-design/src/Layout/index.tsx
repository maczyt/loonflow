import { Box } from '@mui/system';
import { addOrMoveField, store } from '../store';
import { DnDTypes } from '../types';
import Empty from './Empty';
import { RenderField, RenderPlaceholder } from './render';
import DropContainer from './DropContainer';
import { observer } from 'mobx-react';
import { removePlaceholderEle } from '../hooks/useNestedDrop';

const Layout = () => {
  return (
    <Box
      sx={{
        padding: '16px 16px 0',
      }}
    >
      <DropContainer
        sx={{
          height: '100%',
          background: '#fff',
        }}
        level="container"
        accept={DnDTypes.box}
        fields={store.fields}
        renderPlaceholder={(field) => <RenderPlaceholder field={field} />}
        renderEmpty={() => <Empty />}
        renderField={(field) => <RenderField field={field} />}
        onDrop={(item, nextId) => {
          addOrMoveField(store.fields, item, nextId);
        }}
        onLeave={() => {
          removePlaceholderEle();
        }}
      />
    </Box>
  );
};

export default observer(Layout);
