import { Box } from '@mui/system';
import { Form, Input, FormListFieldData } from 'antd';
import { observer } from 'mobx-react';
import { RichTextEditor } from 'packages/components/src';
import { useEffect } from 'react';
import { store } from '../store';

const Basic = () => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: store.name,
      description: store.description,
    });
  }, []);
  return (
    <Box
      sx={{
        width: '800px',
        margin: '18px auto 0',
        background: '#fff',
        height: '100%',
        padding: '40px 100px 0',
      }}
    >
      <Form
        autoComplete="off"
        labelCol={{ span: 4 }}
        form={form}
        onFieldsChange={(fields) => {
          fields.forEach((field) => {
            // @ts-ignore
            store.formChange(field.name?.[0], field.value);
          });
        }}
      >
        <Form.Item
          label="类型名称"
          name="name"
          rules={[{ required: true, message: '请输入类型名称' }]}
        >
          <Input placeholder="请输入工作流的类型名称，例如请假申请" />
        </Form.Item>
        <Form.Item label="引导说明" name="description">
          <RichTextEditor
            placeholder="新建工单时会显示引导"
            style={{
              height: 100,
            }}
          />
        </Form.Item>
      </Form>
    </Box>
  );
};

export default observer(Basic);
