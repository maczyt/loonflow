import { Box } from '@mui/system';
import { Fragment, useEffect, useRef, useState } from 'react';
import LogicFlow from '@logicflow/core';
import { DndPanel, SelectionSelect, MiniMap } from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css';
import '@logicflow/extension/lib/style/index.css';
import { Button, Divider, message, Tooltip } from 'antd';

import { VALUE_BACK_SPACE } from 'keycode-js';
import { setLoginFlow } from './store';
import useToolbars from './hooks/useToolbars';
import useEvents from './hooks/useEvents';
import SettingDrawer from './components/SettingDrawer';
LogicFlow.use(DndPanel);
LogicFlow.use(SelectionSelect);
LogicFlow.use(MiniMap);

message.config({
  maxCount: 1,
});

export const ProcessDesign = () => {
  const [lf, setLf] = useState<LogicFlow | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lf = new LogicFlow({
      container: containerRef.current!,
      grid: true,
      background: {
        backgroundColor: '#F7F8FA',
      },
      stopMoveGraph: true,
      edgeType: 'bezier',
    });
    lf.render();
    lf.extension.miniMap.isShowHeader = false;
    lf.extension.miniMap.isShowCloseIcon = false;
    lf.extension.miniMap.show(window.innerWidth - 156);
    setLoginFlow(lf);
    setLf(lf);
  }, []);
  const { toolbarConfig } = useToolbars(lf);
  useEvents(lf);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* toolbar */}
      <Box
        sx={{
          boxShadow: '0 0 4px rgba(10, 42, 97, .2)',
          height: '45px',
          background: '#fff',
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '0 14px',
          '.ant-btn-text': {
            padding: '1px 6px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '12px',
          },
          '.ant-btn-icon-only': {
            width: 'unset !important',
          },
          '.ant-btn-icon': {
            fontSize: '17px',
            color: '#A3A7AC',
            '&:not(:last-child)': {
              marginInlineEnd: '4px !important',
            },
          },
        }}
      >
        {toolbarConfig.map((items, index) => {
          return (
            <Fragment key={index}>
              {index !== 0 && (
                <Divider
                  style={{
                    height: '17px',
                    borderColor: '#DCDEE0',
                  }}
                  type="vertical"
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {items.map(({ icon, label, title, ...rest }, ind) => (
                  <Tooltip key={ind} title={title} placement="top">
                    <Box {...rest}>
                      <Button icon={icon} type="text">
                        {label}
                      </Button>
                    </Box>
                  </Tooltip>
                ))}
              </Box>
            </Fragment>
          );
        })}
      </Box>
      <Box
        ref={containerRef}
        sx={{
          flex: 1,
        }}
      ></Box>

      <SettingDrawer />
    </Box>
  );
};
