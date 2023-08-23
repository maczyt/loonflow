import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const Organize = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default Organize;
