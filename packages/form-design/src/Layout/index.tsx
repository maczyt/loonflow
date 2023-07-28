import { Box } from '@mui/system';
import Empty from './Empty';

const Layout = () => {
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
      >
        <Empty />
      </Box>
    </Box>
  );
};

export default Layout;
