import { CircleNodeModel } from '@logicflow/core';
import { ProcessDesignStore } from '../../store';

export default class Model extends CircleNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle();
    if (ProcessDesignStore.activeNodeId === this.id) {
      style.fill = '#EDF4FF';
      style.stroke = '#155BD4';
    }
    return style;
  }

  getAnchorStyle(anchorInfo: any) {
    const style = super.getAnchorStyle(anchorInfo);
    style.strokeWidth = '2';
    if (ProcessDesignStore.activeNodeId === this.id) {
      style.stroke = '#155BD4';
    }
    return style;
  }
}
