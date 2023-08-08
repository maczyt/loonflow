import LogicFlow, { NodeData } from '@logicflow/core';
import { useEffect } from 'react';

const useEvents = (lf: LogicFlow) => {
  useEffect(() => {
    if (!lf) return;
    const handleMouseDown = (data: NodeData, e: Event) => {
      console.log('data', data, e);
    };
    lf.on('node:mousedown', handleMouseDown);

    return () => {
      lf.off('node:mousedown', handleMouseDown);
    };
  }, [lf]);
};

export default useEvents;
