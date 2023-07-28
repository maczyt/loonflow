import { Empty } from '@loonflow/icon';
import { Box } from '@mui/system';
import { Empty as AntEmpty } from 'antd';

const FieldProps = () => {
  return (
    <Box
      sx={{
        background: '#fff',
      }}
    >
      <AntEmpty
        style={{
          marginTop: '120px',
        }}
        image={<Empty />}
        description="请在左侧画布选中控件"
      />
    </Box>
  );
};

export default FieldProps;
