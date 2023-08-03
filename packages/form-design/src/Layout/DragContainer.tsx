import { IField } from '@loonflow/schema';
import { Box } from '@mui/system';
import { FC, ReactNode, useRef } from 'react';
import { useDrag } from 'react-dnd';
import { DragItem } from '../types';

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
  return <Box ref={ref}>{children?.({ isDragging })}</Box>;
};

export default DragContainer;
