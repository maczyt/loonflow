import { FC, ReactNode, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { findFieldIndex, moveField, setActiveField, store } from '../store';
import { UIFactory } from '@loonflow/render-ui';
import { Form } from 'antd';
import { Box } from '@mui/system';
import { Field, FieldProp, IField } from '@loonflow/schema';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { DnDTypes, DragItem } from '../types';
import { useLabel } from '../hooks/useGetProp';
import DropContainer from './DropContainer';
import FieldWrapper from './FieldWrapper';

interface IItemWrapperProps {
  active?: boolean;
  children?: ReactNode;
  index: number;
  type: Field;
  field?: IField;
}
const ItemWrapper: FC<IItemWrapperProps> = ({
  active,
  children,
  type,
  index,
  field,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: DnDTypes.box,
      collect(monitor) {
        return {
          isDragging: monitor.isDragging(),
        };
      },
      item() {
        return {
          index,
          sortable: true,
          id: field?.__id__,
        };
      },
    };
  });
  const [_, drop] = useDrop<DragItem, void, any>(() => {
    return {
      accept: DnDTypes.box,
      canDrop(item) {
        // 支持grid
        return !!item.sortable;
      },
      hover(item, monitor) {
        if (!ref.current || !item.sortable) return;
        // 外层的index不会随着移动而马上更新，所以需要手动去数组中获取
        const index = findFieldIndex(field!);
        const dragIndex = item.index as number;
        const hoverIndex = index;
        // Don't replace items with themselves
        if (item.id === field?.__id__ || dragIndex === hoverIndex) {
          return;
        }
        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        // Get vertical middle
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        // Get pixels to the top
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (hoverClientY < 0) return;
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveField(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    };
  });
  drag(drop(ref));
  return type === Field.placeholder ? (
    <Box
      ref={ref}
      sx={{ height: '12px', background: '#155BD4', margin: '4px 0' }}
      data-drag-placeholder
    />
  ) : (
    <Box
      ref={ref}
      sx={{
        padding: '8px',
        outline: active ? `2px solid #2e73ff` : `1px dashed #2e73ff`,
        position: 'relative',
        marginBottom: '16px',
        cursor: 'pointer',
        opacity: isDragging ? 0 : 1,
      }}
      data-sortable-index={index}
      onMouseDown={() => {
        setActiveField(field?.__id__);
      }}
    >
      {children}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      />
    </Box>
  );
};

const Render: FC = () => {
  const snap = useSnapshot(store);
  return (
    <>
      {snap.fields.map((field) => {
        const fieldItem = UIFactory.get(field.type);
        const Component = fieldItem?.component;
        const index = snap.realField.findIndex(
          (rField) => rField.__id__ === field.__id__
        );
        if (Component) {
          const label = field.props?.find(
            (prop) => prop.type === FieldProp.title
          )?.value;
          return (
            <ItemWrapper
              key={field.__id__}
              index={index}
              type={field.type}
              // @ts-ignore
              field={field}
              active={field.__id__ === snap.activeFieldId}
            >
              <Form.Item label={label}>
                <Component />
              </Form.Item>
            </ItemWrapper>
          );
        }
        return null;
      })}
    </>
  );
};

export const RenderPlaceholder: FC<{
  field?: IField;
}> = ({ field }) => {
  return field ? (
    <RenderField field={field} />
  ) : (
    <Box sx={{ paddingBottom: '8px' }}>
      <Box sx={{ height: '12px', background: '#155BD4' }} />
    </Box>
  );
};

export const RenderColField: FC<{
  field: IField;
}> = ({ field }) => {
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  return Component ? (
    <Component style={{}}>
      <DropContainer
        accept={DnDTypes.box}
        fields={field.children}
        renderField={(field) => <RenderField field={field} />}
        onDrop={(item, nextId) => {}}
      />
    </Component>
  ) : null;
};

export const RenderField: FC<{
  field: IField;
}> = ({ field }) => {
  const label = useLabel(field);
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  console.log(field, 'field');
  return Component ? (
    field.type === Field.col ? (
      <RenderColField field={field} />
    ) : (
      <FieldWrapper
        hideBackdrop={field.type === Field.row}
        field={field}
        sx={{
          minHeight: 50,
        }}
      >
        <Form.Item label={label}>
          <Component>
            {field.children?.map((childField) => (
              <RenderField field={childField} key={childField.__id__} />
            ))}
          </Component>
        </Form.Item>
        {field.__id__}
        {field.type}
      </FieldWrapper>
    )
  ) : null;
};

export default Render;
