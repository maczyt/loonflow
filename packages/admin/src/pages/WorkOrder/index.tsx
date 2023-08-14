import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const WorkOrder = () => {
  return (
    <Box>
      <Outlet />
    </Box>
  );
};

export default WorkOrder;
