import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

const WorkOrder = () => {
  return (
    <Box>
      工单管理
      <Outlet />
    </Box>
  );
};

export default WorkOrder;
