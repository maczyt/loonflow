import { Box } from '@mui/system';
import { useDrop } from 'react-dnd';
import { DnDTypes } from '../types';
import Empty from './Empty';

const Layout = () => {
  const [{ isOver }, drop] = useDrop(() => {
    return {
      accept: DnDTypes.box,
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
      hover(item) {
        console.log(item, 'item');
      },
      drop(item, monitor) {
        console.log('item', item);
      },
    };
  });
  return (
    <Box
      sx={{
        padding: '16px 16px 0',
      }}
    >
      <Box
        sx={{
          height: '100%',
          background: '#fff',
          backgroundClip: 'content-box',
        }}
        ref={drop}
      >
        <Empty />
      </Box>
    </Box>
  );
};

export default Layout;
