import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import { BackgroundCanvas } from '@loonflow/components';
import { IconLogo } from '@loonflow/icon';
import { Box } from '@mui/system';
import { Tabs } from 'antd';
import { useState } from 'react';
import s from './index.module.css';

type LoginType = 'phone' | 'account';
const Login = () => {
  const [loginType, setLoginType] = useState<LoginType>('account');
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
              <IconLogo />
            </Box>
          }
          title="Loonflow"
          subTitle="致力于为企业提供统一的工作流解决方案"
          onFinish={async (formData) => {
            console.log('sdfjkhskjfhskjfh', formData);
            await new Promise((resolve) => setTimeout(resolve, 1000));
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
                placeholder={'用户名: admin or user'}
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
                placeholder={'密码: ant.design'}
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
