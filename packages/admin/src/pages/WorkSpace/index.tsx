import { Box } from '@mui/system';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const WorkSpace = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button
        onClick={() => {
          navigate('/flow');
        }}
      >
        新建工作流
      </Button>
    </Box>
  );
};

export default WorkSpace;
