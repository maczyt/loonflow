import {
  AdvanceFieldProps,
  BasicFieldProps,
  FieldTitle,
} from '@loonflow/schema';
import { Box } from '@mui/system';
import { Tabs, Typography } from 'antd';
import { useState } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';
import PropSetting from './Prop';

const Props = () => {
  const snap = useSnapshot(store);
  const [tabKey, setTabKey] = useState('basic');
  const basicFieldProps = snap.activeField?.props?.filter((prop) =>
    BasicFieldProps.includes(prop.type)
  );
  const advanceFieldProps = snap.activeField?.props?.filter((prop) =>
    AdvanceFieldProps.includes(prop.type)
  );
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '.ant-tabs-content': {
          height: '100%',
          overflow: 'hidden',
          padding: '0 16px',
        },
        '.ant-tabs-tabpane': {
          height: '100%',
          overflow: 'auto',
        },
      }}
    >
      <Typography.Title
        level={2}
        style={{ fontSize: '18px', margin: '24px 16px 12px' }}
      >
        {FieldTitle[snap.activeField!.type]}
      </Typography.Title>
      <Tabs
        activeKey={tabKey}
        tabBarStyle={{
          padding: '0 16px',
        }}
        style={{
          flex: 1,
        }}
        items={[
          {
            key: 'basic',
            label: '基础设置',
            children: (
              <Box>
                {basicFieldProps?.map((prop, index) => {
                  return <PropSetting prop={prop} key={index} />;
                })}
              </Box>
            ),
          },
          {
            key: 'advance',
            label: '高级设置',
            children: <div>advance</div>,
          },
        ]}
        onChange={(key) => {
          setTabKey(key);
        }}
      />
    </Box>
  );
};

export default Props;
