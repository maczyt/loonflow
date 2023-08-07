import { Box } from '@mui/system';
import { Form, Input, Divider, Checkbox } from 'antd';
import { observer } from 'mobx-react';
import { RichTextEditor } from 'packages/components/src';
import { useEffect } from 'react';
import { store } from '../store';
import s from './index.module.css';

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
        height: 'calc(100% - 18px)',
        padding: '40px 100px 0',
        overflow: 'auto',
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
            className={s.editorContainer}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          extra="工单状态变更时会自动发送消息提醒待办人。可在高级设置里自定义。"
          style={{ marginBottom: 0 }}
        >
          <Checkbox>开启消息通知</Checkbox>
        </Form.Item>
        <Form.Item>
          <Checkbox>在待办列表显示</Checkbox>
        </Form.Item>
      </Form>
    </Box>
  );
};

export default observer(Basic);
