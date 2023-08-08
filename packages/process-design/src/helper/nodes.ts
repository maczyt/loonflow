import LogicFlow from '@logicflow/core';
import { NodeType } from '@loonflow/schema';

export const hasStartNode = (lf: LogicFlow) => {
  const { nodes } = lf.getGraphRawData();
  return nodes.some(
    (node) => node.type === NodeType.startEnd && node.properties?.isStartNode
  );
};

export const hasEndNode = (lf: LogicFlow) => {
  const { nodes } = lf.getGraphRawData();
  return nodes.some(
    (node) => node.type === NodeType.startEnd && !node.properties?.isStartNode
  );
};
