import { Box } from '@mui/system';
import { useSnapshot } from 'valtio';
import {
  addField,
  findFieldIndex,
  findFieldIndexById,
  moveField,
  store,
} from '../store';
import { DnDTypes } from '../types';
import Empty from './Empty';
import { RenderField, RenderPlaceholder } from './render';
import DropContainer from './DropContainer';

const Layout = () => {
  const snap = useSnapshot(store);
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
        accept={DnDTypes.box}
        // @ts-ignore
        fields={snap.fields}
        renderPlaceholder={(field) => <RenderPlaceholder field={field} />}
        renderEmpty={() => <Empty />}
        renderField={(field) => <RenderField field={field} />}
        onDrop={(item, nextId) => {
          if (item.field) {
            // move
            const fromIndex = findFieldIndex(item.field);
            const toIndex = findFieldIndexById(nextId);
            moveField(fromIndex, toIndex);
          } else {
            // add
            const index = findFieldIndexById(nextId);
            addField(item.type, index);
          }
        }}
      />
    </Box>
  );
};

export default Layout;
