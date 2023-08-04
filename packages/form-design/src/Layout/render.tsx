import { FC } from 'react';
import { addOrMoveField, setActiveId, store } from '../store';
import { UIFactory } from '@loonflow/render-ui';
import { Form } from 'antd';
import { Box } from '@mui/system';
import { Field, IField } from '@loonflow/schema';
import { DnDTypes } from '../types';
import { useLabel } from '../hooks/useGetProp';
import DropContainer from './DropContainer';
import FieldWrapper from './FieldWrapper';
import { observer } from 'mobx-react';

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
}> = observer(({ field }) => {
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  const active = store.activeFieldId === field?.__id__;
  return Component ? (
    <Component
      style={{
        padding: '8px',
        outline: active ? `2px solid #2e73ff` : `1px dashed #2e73ff`,
        position: 'relative',
        cursor: 'pointer',
        minHeight: 50,
      }}
      onClick={(ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        setActiveId(field.__id__);
      }}
    >
      <DropContainer
        level="column"
        accept={DnDTypes.box}
        fields={field.children}
        renderField={(field) => <RenderField field={field} />}
        renderPlaceholder={(field) => <RenderPlaceholder field={field} />}
        onDrop={(item, nextId) => {
          // console.log()
          addOrMoveField(field.children!, item, nextId);
        }}
      />
    </Component>
  ) : null;
});

export const RenderRealField: FC<{ field: IField }> = observer(({ field }) => {
  const label = useLabel(field);
  const fieldItem = UIFactory.get(field.type)!;
  const Component = fieldItem.component;
  return (
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
    </FieldWrapper>
  );
});

export const RenderField: FC<{
  field: IField;
}> = ({ field }) => {
  const fieldItem = UIFactory.get(field.type);
  const Component = fieldItem?.component;
  return Component ? (
    field.type === Field.col ? (
      <RenderColField field={field} />
    ) : (
      <RenderRealField field={field} />
    )
  ) : null;
};
