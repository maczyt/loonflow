import { FC, ReactNode, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { setActiveField, store } from '../store';
import { UIFactory } from '@loonflow/render-ui';
import { Form } from 'antd';
import { Box } from '@mui/system';
import { Field, FieldProp, IField } from '@loonflow/schema';
import { useDrag } from 'react-dnd';
import { DnDTypes } from '../types';

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
  const [_, drag] = useDrag(() => {
    return {
      type: DnDTypes.box,
      item() {
        return {
          index,
          sortable: true,
        };
      },
    };
  });
  drag(ref);
  return type === Field.placeholder ? (
    <Box
      ref={ref}
      sx={{ height: '12px', background: '#155BD4', margin: '4px 0' }}
    />
  ) : (
    <Box
      ref={ref}
      sx={{
        padding: '8px',
        outline: active ? `2px solid #2e73ff` : `1px dashed #2e73ff`,
        position: 'relative',
        marginBottom: '4px',
        cursor: 'pointer',
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
      {snap.fields.map((field, index) => {
        const fieldItem = UIFactory.get(field.type);
        const Component = fieldItem?.component;
        if (Component) {
          const label = field.props?.find(
            (prop) => prop.type === FieldProp.title
          )?.value;
          return (
            <ItemWrapper
              key={field.__id__}
              index={index}
              type={field.type}
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

export default Render;
