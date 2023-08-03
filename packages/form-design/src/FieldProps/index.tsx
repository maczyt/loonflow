import { IconEmpty } from '@loonflow/icon';
import { Box } from '@mui/system';
import { Empty as AntEmpty } from 'antd';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import Props from './Props';

const FieldProps = () => {
  const snap = useSnapshot(store);
  return (
    <Box
      sx={{
        background: '#fff',
      }}
    >
      {snap.activeField ? (
        <Props />
      ) : (
        <AntEmpty
          style={{
            marginTop: '120px',
          }}
          image={<IconEmpty />}
          description="请在左侧画布选中控件"
        />
      )}
    </Box>
  );
};

export default FieldProps;
