import { Box } from '@mui/system';
import { Form, Input } from 'antd';

const Basic = () => {
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
      <Form autoComplete="off">
        <Form.Item
          label="类型名称"
          name="name"
          rules={[{ required: true, message: '请输入类型名称' }]}
        >
          <Input placeholder="请输入工作流的类型名称，例如请假申请" />
        </Form.Item>
      </Form>
    </Box>
  );
};

export default Basic;
