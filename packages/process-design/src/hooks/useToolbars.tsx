import LogicFlow from '@logicflow/core';
import {
  IconDiamond,
  IconEndNode,
  IconRect,
  IconRedo,
  IconStartNode,
  IconUndo,
} from '@loonflow/icon';
import { NodeType } from '@loonflow/schema';
import { message } from 'antd';
import { useEffect, useMemo } from 'react';
import { hasEndNode, hasStartNode } from '../helper';
import { registerNodes } from '../Nodes';
import { IToolbarConfig } from '../types';

const useToolbars = (lf: LogicFlow | null) => {
  const toolbarConfig: Array<IToolbarConfig[]> = useMemo(
    () =>
      lf
        ? [
            [
              {
                title: '上一步',
                icon: <IconUndo />,
                onClick() {
                  lf?.undo();
                },
              },
              {
                title: '下一步',
                icon: <IconRedo />,
                onClick() {
                  lf?.redo();
                },
              },
            ],
            [
              {
                label: '开始节点',
                icon: <IconStartNode />,
                onMouseDown() {
                  if (!lf) return;
                  // max limit 1 start node
                  if (hasStartNode(lf)) {
                    message.warning('已有开始节点，最多只能设置一个');
                    return;
                  }
                  lf.dnd.startDrag({
                    type: NodeType.startEnd,
                    text: `开始节点`,
                    properties: {
                      isStartNode: true,
                    },
                  });
                },
              },
              {
                label: '结束节点',
                icon: <IconEndNode />,
                onMouseDown() {
                  if (!lf) return;
                  // max limit 1 end node
                  if (hasEndNode(lf)) {
                    message.warning('已有结束节点，最多只能设置一个');
                    return;
                  }
                  lf.dnd.startDrag({
                    type: NodeType.startEnd,
                    text: `结束节点`,
                  });
                },
              },
              {
                label: '审批节点',
                icon: <IconRect />,
                onMouseDown() {
                  lf?.dnd.startDrag({
                    type: NodeType.approve,
                    text: `审批节点`,
                  });
                },
              },
              {
                label: '条件节点',
                icon: <IconDiamond />,
                onMouseDown() {
                  lf?.dnd.startDrag({
                    type: NodeType.condition,
                  });
                },
              },
            ],
          ]
        : [],
    [lf]
  );

  useEffect(() => {
    if (!lf) return;
    registerNodes(lf);
  }, [lf]);

  return {
    toolbarConfig,
  } as const;
};

export default useToolbars;
