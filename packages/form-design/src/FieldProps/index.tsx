import Icons from '@loonflow/icon';
import { Box } from '@mui/system';
import { Empty as AntEmpty } from 'antd';
import { observer } from 'mobx-react';
import { store } from '../store';
import Props from './Props';
import { useEffect } from 'react';
import { useFormDesignContext } from '../context/FormDesignContext';
import { toJS } from 'mobx';

const FieldProps = () => {
  const { onFormDesignErrorsChange } = useFormDesignContext();

  useEffect(() => {
    // emit global error handler center
    if (store.hasError) {
      onFormDesignErrorsChange(toJS(store.errors));
    } else {
      onFormDesignErrorsChange(new Map());
    }
  }, [onFormDesignErrorsChange, store.hasError]);

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
          image={<Icons.IconEmpty />}
          description="请在左侧画布选中控件"
        />
      )}
    </Box>
  );
};

export default observer(FieldProps);
