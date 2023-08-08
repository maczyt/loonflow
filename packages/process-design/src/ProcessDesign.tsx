import { Box } from '@mui/system';
import { Fragment, useEffect, useRef } from 'react';
import LogicFlow from '@logicflow/core';
import { DndPanel } from '@logicflow/extension';
import '@logicflow/core/dist/style/index.css';
import { registerNodes } from './Nodes';
import { Button, Divider } from 'antd';
import { IToolbarConfig } from './types';
import { IconRedo, IconStartNode, IconUndo } from '@loonflow/icon';
import { NodeType } from '@loonflow/schema';
LogicFlow.use(DndPanel);

export const ProcessDesign = () => {
  const lfRef = useRef<LogicFlow | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const toolbarConfig: Array<IToolbarConfig[]> = [
    [
      {
        title: 'undo',
        icon: <IconUndo />,
        onClick() {
          lfRef.current?.undo();
        },
      },
      {
        title: 'redo',
        icon: <IconRedo />,
        onClick() {
          lfRef.current?.redo();
        },
      },
    ],
    [
      {
        title: '开始节点',
        label: '开始节点',
        icon: <IconStartNode />,
        onMouseDown() {
          console.log(lfRef.current?.dnd);
          lfRef.current?.dnd.startDrag({
            type: NodeType.startEnd,
            text: `开始节点`,
          });
        },
      },
    ],
  ];
  useEffect(() => {
    const lf = (lfRef.current = new LogicFlow({
      container: containerRef.current!,
      grid: true,
      background: {
        backgroundColor: '#F7F8FA',
      },
    }));
    registerNodes(lf);
    lf.render();
  }, []);
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
                  <Box key={ind} {...rest}>
                    <Button icon={icon} type="text">
                      {label}
                    </Button>
                  </Box>
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
    </Box>
  );
};
