import { UIFactory } from '@loonflow/render-ui';
import { Field, IField } from '@loonflow/schema';
import { Box, styled } from '@mui/system';
import React, { useEffect, useRef } from 'react';
import { useHelper, useLabel, useProps } from '../hooks/useGetProp';
import { getFieldsById, setActiveId, store } from '../store';
import { arrayMoveMutable } from 'array-move';
import Sortable from 'sortablejs';
import './container.less';
import { addNewField } from '../store';
import Empty from './Empty';
import { observer } from 'mobx-react';
import FieldWrapper from './FieldWrapper';
import { Form } from 'antd';
import FieldOperators from '../FieldOperators/Container';

const RenderColField: React.FC<{
  field: IField;
}> = observer(({ field }) => {
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  const active = store.activeFieldId === field?.__id__;
  const props = useProps(field);
  const hasError = store.errors
    .get(store.activeFieldId)
    ?.some(([_, errors]) => errors.length > 0);
  const color = hasError ? '#F56C6C' : '#2e73ff';
  return Component ? (
    <Component
      {...props}
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
        paddingTop: '8px',
        paddingBottom: '8px',
        outline: active ? `2px solid ${color}` : `1px dashed ${color}`,
        position: 'relative',
        cursor: 'pointer',
        boxSizing: 'border-box',
        marginBottom: '8px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setActiveId(field.__id__);
      }}
    >
      <StyledContainer
        fields={field.children}
        sx={{
          minHeight: 50,
        }}
        droppable
        parentFieldId={field.__id__}
      />
      {active ? (
        <Box
          sx={{
            marginTop: '8px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <FieldOperators field={field} />
        </Box>
      ) : null}
    </Component>
  ) : null;
});

const RenderField = observer(({ field }: { field: IField }) => {
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  const props = useProps(field);
  const label = useLabel(field);
  const extra = useHelper(field);
  if (!Component) return null;
  return field.type === Field.col ? (
    <RenderColField field={field} />
  ) : (
    <FieldWrapper field={field} hideBackdrop={field.type === Field.row}>
      <Form.Item label={label} extra={extra}>
        <Component
          {...props}
          style={{
            minHeight: 50,
          }}
        >
          <StyledContainer fields={field.children} />
        </Component>
      </Form.Item>
    </FieldWrapper>
  );
});

const Container: React.FC<{
  className?: string;
  fields?: IField[];
  droppable?: boolean;
  showEmpty?: boolean;
  parentFieldId?: string;
}> = ({ className, fields, droppable, showEmpty, parentFieldId }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !droppable) return;
    const sortable = new Sortable(ref.current, {
      group: {
        name: 'controls',
      },
      animation: 150,
      ghostClass: 'container-sortable-ghost',
      dragClass: 'container-sortable-drag',
      swapThreshold: 0.6,
      onAdd(evt) {
        // @ts-ignores
        const fieldType = evt.originalEvent.dataTransfer.getData('field-type');
        if (fieldType && fields) {
          addNewField(fieldType, evt.newIndex, fields);
          evt.item.remove();
        }
      },
      onEnd(evt) {
        const { from, to, oldIndex, newIndex } = evt;
        const fromFieldId = from.dataset.fieldId;
        const toFieldId = to.dataset.fieldId;
        if (!fromFieldId || !toFieldId) return;

        if (fromFieldId === toFieldId) {
          // sort
          const fields = getFieldsById(fromFieldId);
          arrayMoveMutable(fields, oldIndex!, newIndex!);
          setActiveId(fields[newIndex!].__id__);
        } else {
          const newFields = getFieldsById(toFieldId);
          const oldFields = getFieldsById(fromFieldId);
          const field = oldFields[oldIndex!];

          // Fix: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node.
          const target = evt.item;
          target.style.display = 'none';
          evt.from.appendChild(target);

          oldFields.splice(oldIndex!, 1);
          newFields.splice(newIndex!, 0, field);
          setActiveId(field.__id__);
        }
      },
    });
    return () => {
      sortable.destroy();
    };
  }, []);
  const length = fields?.length;
  return (
    <>
      {droppable ? (
        <Box className={className} ref={ref} data-field-id={parentFieldId}>
          {fields?.map((field) => {
            return <RenderField field={field} key={field.__id__} />;
          })}
        </Box>
      ) : (
        fields?.map((field) => {
          return <RenderField field={field} key={field.__id__} />;
        })
      )}

      {length === 0 && showEmpty ? <Empty /> : null}
    </>
  );
};

const StyledContainer = styled(observer(Container))(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
}));

export default StyledContainer;
