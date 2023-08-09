import { Drawer } from 'antd';
import { observer } from 'mobx-react';
import { ProcessDesignStore } from '../../store';

const SettingDrawer = () => {
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={() => {
        ProcessDesignStore.settingOpen = false;
      }}
      open={ProcessDesignStore.settingOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default observer(SettingDrawer);
