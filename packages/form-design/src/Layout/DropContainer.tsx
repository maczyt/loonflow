import { IField } from '@loonflow/schema';
import { Box, SxProps } from '@mui/system';
import { useUpdateEffect } from 'ahooks';
import {
  FC,
  Fragment,
  isValidElement,
  ReactNode,
  useCallback,
  useRef,
} from 'react';
import { useDrop, XYCoord } from 'react-dnd';
import { render } from 'react-dom';
import { DnDTypes, DragItem } from '../types';
import DragContainer from './DragContainer';
import FieldWrapper from './FieldWrapper';

const DropItem: FC<{
  children?: ReactNode;
  id?: string;
  field: IField;
}> = ({ children, id, field }) => {
  return (
    <Box
      sx={{
        paddingBottom: '8px',
      }}
      data-drop-item
      data-drop-item-id={id}
    >
      <DragContainer dragType={DnDTypes.box} field={field}>
        {({ isDragging }) => (
          <Box
            sx={{
              opacity: isDragging ? 0.4 : 1,
            }}
          >
            {children}
          </Box>
        )}
      </DragContainer>
    </Box>
  );
};

interface IProps {
  className?: string;
  sx?: SxProps;
  accept?: any;
  fields?: IField[];
  onDrop?: (item: DragItem, nextId?: string) => void;
  renderPlaceholder?: (field?: IField) => ReactNode;
  renderEmpty?: () => ReactNode;
  renderField?: (field: IField, index: number) => ReactNode;
}
const DropContainer: FC<IProps> = ({
  className,
  sx,
  accept,
  fields,
  renderPlaceholder,
  renderField,
  renderEmpty = () => null,
  onDrop,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<null | HTMLElement>(null);
  const removePlaceholderElm = useCallback(() => {
    if (placeholderRef.current?.hasAttribute('data-drop-item-id')) return;
    placeholderRef.current?.remove();
  }, []);
  const [{ isOver }, drop] = useDrop<
    DragItem,
    void,
    {
      isOver: boolean;
    }
  >(() => {
    return {
      accept,
      collect(monitor) {
        return {
          isOver: monitor.isOver(),
        };
      },
      hover(item, monitor) {
        if (!placeholderRef.current) {
          if (item.field) {
            placeholderRef.current = document.querySelector(
              `[data-drop-item-id='${item.field.__id__}']`
            ) as HTMLElement;
          } else {
            const node = renderPlaceholder?.(item.field);
            const elm = document.createElement('div');
            render(<>{node}</>, elm);
            placeholderRef.current = elm;
          }
        }
        const { x, y } = monitor.getClientOffset() as XYCoord;
        let target = document
          .elementFromPoint(x, y)
          ?.closest('[data-drop-item]');

        if (placeholderRef.current === target) return;
        if (target) {
          // 上还是下
          const rect = target.getBoundingClientRect();
          const middle = rect.top + (rect.bottom - rect.top) / 2;
          if (middle < y) {
            target = target.nextElementSibling;
          }
          console.log(target, placeholderRef.current);
          ref.current?.insertBefore(placeholderRef.current, target);
          return;
        }
        if (!ref.current?.contains(placeholderRef.current)) {
          ref.current?.appendChild(placeholderRef.current);
        }
      },
      drop(item) {
        if (!placeholderRef.current) return;
        const nextSibling = placeholderRef.current.nextElementSibling;
        onDrop?.(item, nextSibling?.getAttribute('data-drop-item-id') ?? '');
        removePlaceholderElm();
        placeholderRef.current = null;
      },
    };
  }, [onDrop, renderPlaceholder, removePlaceholderElm]);
  drop(ref);

  useUpdateEffect(() => {
    if (!isOver) {
      if (!placeholderRef.current) return;
      removePlaceholderElm();
      placeholderRef.current = null;
    }
  }, [isOver, removePlaceholderElm]);
  return (
    <Box ref={ref} className={className} sx={sx}>
      {fields?.length === 0 && !isOver
        ? renderEmpty()
        : fields?.map((field, index) => {
            const fieldNode = renderField?.(field, index);
            return (
              <Fragment key={field.__id__}>
                {isValidElement(fieldNode) ? (
                  <DropItem field={field} id={field.__id__}>
                    {fieldNode}
                  </DropItem>
                ) : (
                  fieldNode
                )}
              </Fragment>
            );
          })}
    </Box>
  );
};

export default DropContainer;
