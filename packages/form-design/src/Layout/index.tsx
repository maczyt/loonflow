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
  const snap = useSnapshot(store);
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
        const { y: top, x: left } = monitor.getClientOffset() as XYCoord;
        const children = dropRef.current.querySelectorAll(
          '[data-sortable-index]'
        ) as unknown as HTMLDivElement[];
        if (item.sortable) {
          // empty
        } else {
          let index = children.length;
          const pointDom = document.elementFromPoint(left, top);
          if (pointDom?.closest('[data-drag-placeholder]')) return;
          const target = document
            .elementFromPoint(left, top)
            ?.closest('[data-sortable-index]');
          console.log('targer asjdhakjdhakjsd', target);
          const rect = target?.getBoundingClientRect();
          if (rect) {
            const middle = rect?.top + (rect?.bottom - rect.top) / 2;
            index = +(target?.getAttribute('data-sortable-index') ?? 0);

            if (top >= middle) {
              index = index + 1;
            }
          }
          console.log('index', index);
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
