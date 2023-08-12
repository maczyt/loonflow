import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const Organize = () => {
  return (
    <Box>
      组织管理 <Outlet />
    </Box>
  );
};

export default Organize;
