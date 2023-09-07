import { IField } from '@loonflow/schema';
import { Box, SxProps } from '@mui/system';
import { useUpdateEffect } from 'ahooks';
import { observer } from 'mobx-react';
import { FC, Fragment, isValidElement, ReactNode } from 'react';
import useNestedDrop from '../hooks/useNestedDrop';
import { DnDTypes, DragItem } from '../types';
import DragContainer from './DragContainer';

const DropItem: FC<{
  children?: ReactNode;
  id?: string;
  field: IField;
}> = ({ children, id, field }) => {
  return (
    <Box
      sx={{
        paddingBottom: '12px',
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
  level?: string;
  onDrop?: (item: DragItem, nextId?: string) => void;
  onLeave?: () => void;
  renderPlaceholder?: (field?: IField) => ReactNode;
  renderEmpty?: () => ReactNode;
  renderField?: (field: IField, index: number) => ReactNode;
}
const DropContainer: FC<IProps> = ({
  className,
  sx,
  accept,
  fields,
  level,
  renderPlaceholder,
  renderField,
  renderEmpty = () => null,
  onDrop,
  onLeave,
}) => {
  const { ref, isOver } = useNestedDrop({
    accept,
    level,
    onDrop,
    renderPlaceholder,
  });
  useUpdateEffect(() => {
    if (!isOver) {
      onLeave?.();
    }
  }, [isOver]);
  return (
    <Box ref={ref} className={className} data-drop-container sx={sx}>
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

export default observer(DropContainer);
