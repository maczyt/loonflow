import { IField } from '@loonflow/schema';
import { Box } from '@mui/system';
import { FC, ReactNode, useEffect, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { DragItem } from '../types';
import { unsetDragItemStyle } from '../utils';

interface IOpt {
  isDragging: boolean;
}
interface IProps {
  dragType: any;
  field: IField;
  children?: (opt: IOpt) => ReactNode;
}
const DragContainer: FC<IProps> = ({ dragType, field, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag<DragItem, void, IOpt>(() => {
    return {
      type: dragType,
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      item() {
        return {
          id: field.__id__,
          field,
          type: field.type,
        };
      },
    };
  }, [field]);
  drag(ref);

  useEffect(() => {
    if (!isDragging) {
      try {
        const elm = ref.current?.closest('[data-drop-item-id]') as HTMLElement;
        unsetDragItemStyle(elm);
      } catch (e) {
        //
      }
    }
  }, [isDragging]);
  return <Box ref={ref}>{children?.({ isDragging })}</Box>;
};

export default DragContainer;
