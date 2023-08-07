import { RichTextEditor } from '@loonflow/components';
import { Box } from '@mui/system';
import { Form } from 'antd';
import EditorWithFields from '../components/EditorWithFields';
import s from './index.module.css';

const Notification = () => {
  return (
    <Box>
      <Form
        labelCol={{
          span: 4,
        }}
      >
        <Form.Item
          label="标题模版"
          required
          rules={[
            {
              required: true,
              message: '请输入标题模版',
            },
          ]}
        >
          <EditorWithFields
            className={s.editorContainer}
            placeholder="例：出差费用报销，金额{money}"
          />
        </Form.Item>
        <Form.Item label="通知模版">
          <RichTextEditor
            className={s.editorContainer}
            placeholder="例：出差费用报销，金额{money}"
          />
        </Form.Item>
      </Form>
    </Box>
  );
};

export default Notification;
