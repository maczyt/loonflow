import { IconEmpty } from '@loonflow/icon';
import { Box } from '@mui/system';
import { Empty as AntEmpty } from 'antd';
import { observer } from 'mobx-react';
import { store } from '../store';
import Props from './Props';

const FieldProps = () => {
  return (
    <Box
      sx={{
        background: '#fff',
      }}
    >
      {store.activeField ? (
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

export default observer(FieldProps);
