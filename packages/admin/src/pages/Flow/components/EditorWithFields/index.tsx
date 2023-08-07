import { IRichTextEditorProps, RichTextEditor } from '@loonflow/components';
import { FormDesignStore } from '@loonflow/form-design';
import { Box } from '@mui/system';
import { Modal, Select, Form, Button } from 'antd';
import { FC, useState } from 'react';

const SelectFields = ({
  quill,
  onClose,
}: {
  quill: any;
  onClose: () => void;
}) => {
  const fields = FormDesignStore.fieldsOptions;
  const [value, onChange] = useState('');
  return (
    <Box>
      <Form.Item label="表单项">
        <Select value={value} onChange={(v) => onChange(v)}>
          {fields.map((field) => (
            <Select.Option key={field.value} value={field.value}>
              {field.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
        }}
      >
        <Button type="default" onClick={onClose}>
          取消
        </Button>
        <Button
          type="primary"
          disabled={!value}
          onClick={() => {
            const length = quill.getLength();
            quill.insertText(length - 1, `{${value}}`);
            onClose();
          }}
        >
          确认
        </Button>
      </Box>
    </Box>
  );
};

const EditorWithFields: FC<IRichTextEditorProps> = ({
  value,
  onChange,
  className,
  placeholder,
}) => {
  return (
    <Box>
      <RichTextEditor
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
        customIcons={[
          {
            name: 'fields-list',
            icon: '选择表单项',
            onClick: (quill) => {
              const modal = Modal.confirm({
                title: '请选择表单项',
                content: (
                  <SelectFields
                    quill={quill}
                    onClose={() => {
                      modal.destroy();
                    }}
                  />
                ),
                footer: null,
              });
            },
          },
        ]}
        toolbarConfig={{
          customConfig: [['fields-list']],
        }}
      />
    </Box>
  );
};

export default EditorWithFields;
