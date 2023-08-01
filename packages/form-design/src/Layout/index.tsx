import { Box } from '@mui/system';
import { useRef } from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { useSnapshot } from 'valtio';
import { addPlaceholder, removePlaceholder, store } from '../store';
import { DnDTypes, DragItem } from '../types';
import Empty from './Empty';
import Render from './render';
import { useUpdateEffect } from 'ahooks';

const Layout = () => {
  const dropRef = useRef<HTMLDivElement>(null);
  const [{ isOver }, drop] = useDrop<
    DragItem,
    void,
    {
      isOver: boolean;
    }
  >(() => {
    return {
      accept: DnDTypes.box,
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
      hover(item: DragItem, monitor) {
        if (!dropRef.current) return;
        const { y: top } = monitor.getClientOffset() as XYCoord;
        const children = dropRef.current.querySelectorAll(
          '[data-sortable-index]'
        ) as unknown as HTMLDivElement[];
        if (item.sortable) {
          // empty
        } else {
          let index = 0;
          if (!snap.isEmpty) {
            children.forEach((child, childIndex) => {
              const rect = child.getBoundingClientRect();
              // 第一个
              if (childIndex === 0) {
                if (top < rect.top) {
                  index = 0;
                  return;
                }
              }
              // 最后一个
              else if (childIndex === children.length - 1) {
                if (top > rect.bottom) {
                  index = childIndex + 1;
                  return;
                }
              }
              if (rect.top <= top && rect.bottom >= top) {
                index = childIndex;
              }
            });
          }
          addPlaceholder(index);
        }
      },
      drop(item, monitor) {
        removePlaceholder(item.type);
      },
    };
  });

  useUpdateEffect(() => {
    if (!isOver) {
      removePlaceholder();
    }
  }, [isOver]);
  const snap = useSnapshot(store);
  drop(dropRef);
  return (
    <Box
      sx={{
        padding: '16px 16px 0',
      }}
    >
      <Box
        sx={{
          height: '100%',
          background: '#fff',
          backgroundClip: 'content-box',
        }}
        ref={dropRef}
      >
        {snap.isEmpty ? <Empty /> : <Render />}
      </Box>
    </Box>
  );
};

export default Layout;
