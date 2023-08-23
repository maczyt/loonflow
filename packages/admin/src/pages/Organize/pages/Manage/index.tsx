import { Box } from '@mui/system';
import { Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import Department from './Department';
import User from './User';

const Manage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Tabs
        tabBarGutter={32}
        tabBarStyle={{ padding: '0 16px' }}
        items={[
          {
            key: 'user',
            label: t('cheng-yuan'),
            children: <User />,
          },
          {
            key: 'department',
            label: t('bu-men'),
            children: <Department />,
          },
        ]}
      ></Tabs>
    </Box>
  );
};

export default Manage;
