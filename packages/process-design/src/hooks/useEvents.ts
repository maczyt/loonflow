import LogicFlow, { NodeData, EdgeData } from '@logicflow/core';
import React, { useEffect } from 'react';
import { ProcessDesignStore } from '../store';

const useEvents = (lf: LogicFlow | null) => {
  useEffect(() => {
    if (!lf) return;
    const handleMouseDown = ({
      data,
      e,
    }: {
      data: NodeData;
      e: React.MouseEvent;
    }) => {
      lf.setProperties(data.id, {
        active: true,
      });
      ProcessDesignStore.assign({
        activeNodeId: data.id,
        settingOpen: true,
      });
    };
    lf.on('node:mousedown', handleMouseDown);

    const handleEdgeClick = ({
      data,
      e,
      ...rest
    }: {
      data: EdgeData;
      e: React.MouseEvent;
    }) => {
      // TODO:
      console.log('data', data, e, rest);
    };
    lf.on('edge:click', handleEdgeClick);
    return () => {
      lf.off('node:mousedown', handleMouseDown);
      lf.off('edge:click', handleEdgeClick);
    };
  }, [lf]);
};

export default useEvents;
