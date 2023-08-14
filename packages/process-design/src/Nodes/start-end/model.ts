import { CircleNodeModel } from '@logicflow/core';
import { ProcessDesignStore } from '../../store';

export default class Model extends CircleNodeModel {
  getConnectedSourceRules() {
    const rules = super.getConnectedSourceRules();
    const {
      properties: { isStartNode },
    } = this;
    if (!isStartNode) {
      const getWayOnlyAsTarget = {
        message: '结束节点只能连入，不能连出！',
        validate: (source) => {
          let isValid = true;
          if (source) {
            isValid = false;
          }
          return isValid;
        },
      };
      rules.push(getWayOnlyAsTarget);
    }
    return rules;
  }

  getConnectedTargetRules() {
    const rules = super.getConnectedTargetRules();
    const {
      properties: { isStartNode },
    } = this;
    if (isStartNode) {
      const notAsTarget = {
        message: '起始节点不能作为边的终点',
        validate: () => false,
      };
      rules.push(notAsTarget);
    }
    return rules;
  }

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

  /**
   * 开始/结束节点只有一个出入口
   * @returns
   */
  getDefaultAnchor() {
    const {
      height,
      x,
      y,
      id,
      properties: { isStartNode },
    } = this;
    if (isStartNode) {
      return [
        {
          x,
          y: y + height / 2,
          type: 'bottom',
          id: `${id}_0`,
        },
      ];
    }
    return [{ x, y: y - height / 2, type: 'top', id: `${id}_0` }];
  }
}
