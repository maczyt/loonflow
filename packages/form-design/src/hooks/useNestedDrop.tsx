import { IField } from '@loonflow/schema';
import { ReactNode, useRef } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { render } from 'react-dom';
import { DragItem } from '../types';

let placeholderElm: HTMLElement | null = null;

const useNestedDrop = ({
  accept,
  level,
  onDrop,
  renderPlaceholder,
}: {
  level?: string;
  accept: any;
  onDrop?: (item: DragItem, nextId?: string) => void;
  renderPlaceholder?: (field?: IField) => ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const getDragMoveElement = (field?: IField) => {
    if (field) {
      return document.querySelector(
        `[data-drop-item-id='${field.__id__}']`
      ) as HTMLElement;
    } else {
      const node = renderPlaceholder?.();
      if (node) {
        const elm = document.createElement('div');
        render(<>{node}</>, elm);
        return elm;
      }
      return null;
    }
  };
  const clearPlaceholderElm = (field?: IField) => {
    if (!placeholderElm) return;
    if (!field) {
      placeholderElm?.remove();
    }
    placeholderElm = null;
  };

  const [{ isOver, isOverCurrent }, drop] = useDrop<
    DragItem,
    void,
    {
      isOver: boolean;
      isOverCurrent: boolean;
    }
  >(
    // @ts-ignore
    () => {
      return {
        accept,
        collect(monitor) {
          return {
            isOver: monitor.isOver(),
            isOverCurrent: monitor.isOver({ shallow: true }),
          };
        },
        hover(item, monitor) {
          const { y } = monitor.getClientOffset() as XYCoord;
          const childrenElements = Array.from(
            ref.current?.childNodes ?? []
          ) as HTMLElement[];
          let target = childrenElements.find((child) => {
            const rect = child.getBoundingClientRect();
            return y <= rect.bottom && y >= rect.top;
          });
          if (!placeholderElm) {
            placeholderElm = getDragMoveElement(item.field);
          }
          if (placeholderElm === target || !placeholderElm) return;

          if (target) {
            const rect = target.getBoundingClientRect();
            const middle = rect.top + (rect.bottom - rect.top) / 2;
            if (middle < y) {
              target = target.nextElementSibling as HTMLElement;
            }
          }
          ref.current?.insertBefore(placeholderElm, target ?? null);
        },
        drop(item, monitor) {
          if (!placeholderElm) return;
          if (item.field) {
            onDrop?.(
              item,
              placeholderElm?.getAttribute('data-drop-item-id') ?? ''
            );
          } else {
            const nextSibling = placeholderElm.nextElementSibling;
            onDrop?.(
              item,
              nextSibling?.getAttribute('data-drop-item-id') ?? ''
            );
          }
          clearPlaceholderElm(item.field);
          return { drop: true };
        },
      };
    },
    [renderPlaceholder]
  );

  drop(ref);

  return {
    ref,
    isOver,
    isOverCurrent,
  } as const;
};

export const removePlaceholderEle = () => {
  if (placeholderElm) {
    placeholderElm.remove();
    placeholderElm = null;
  }
};
export default useNestedDrop;
