import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { awaitHandler } from '@loonflow/common-tools';
import { BackgroundCanvas } from '@loonflow/components';
import Icons from '@loonflow/icon';
import { Box } from '@mui/system';
import { Tabs } from 'antd';
import { useState } from 'react';
import { useActionData } from 'react-router-dom';
import { useLogin } from '../../api/hooks';
import s from './index.module.css';

type LoginType = 'phone' | 'account';
const Login = () => {
  const actionData = useActionData();
  console.log('sdfjksdhfkjdshf', actionData);
  const [loginType, setLoginType] = useState<LoginType>('account');
  const { loginRequest } = useLogin();
  return (
    <Box
      sx={{
        height: '100vh',
      }}
    >
      <BackgroundCanvas className={s.bg} />

      <Box
        sx={{
          background: 'rgba(255, 255, 255, .5)',
          position: 'absolute',
          zIndex: 10,
          left: '50%',
          top: '32px',
          transform: 'translateX(-50%)',
          borderRadius: '32px',
          '.ant-pro-form-login-container ': {
            background: 'none',
          },
        }}
      >
        <LoginForm
          logo={
            <Box
              sx={{
                fontSize: '40px',
                color: '#1677ff',
              }}
            >
              <Icons.IconLogo />
            </Box>
          }
          title="Loonflow"
          subTitle="致力于为企业提供统一的工作流解决方案"
          onFinish={async ({ username, password }) => {
            const [err, resp] = await awaitHandler(
              loginRequest(username, password)
            );
            console.log('resp', resp, err);
          }}
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType(activeKey as LoginType)}
          >
            <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
            {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} disabled /> */}
          </Tabs>
          {loginType === 'account' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder="用户名"
                rules={[
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder="密码"
                rules={[
                  {
                    required: true,
                    message: '请输入密码！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </Box>
    </Box>
  );
};

export default Login;
