import { Avatar, Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { DesktopOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import { IconLogo } from '@loonflow/icon';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { takeRight, dropRight } from 'lodash-es';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '工作台',
    icon: <DesktopOutlined />,
    key: 'workspace',
  },
  {
    label: '工单管理',
    icon: <DesktopOutlined />,
    key: 'workorder',
    children: [
      {
        label: '我的待办',
        key: 'todo',
      },
    ],
  },
  {
    label: '工作流管理',
    icon: <DesktopOutlined />,
    key: 'workflow',
  },
  {
    label: '组织架构',
    icon: <DesktopOutlined />,
    key: 'organize',
    children: [
      {
        label: '部门/成员',
        key: 'manage',
      },
      {
        label: '角色管理',
        key: 'role',
      },
    ],
  },
  {
    label: '系统配置',
    icon: <DesktopOutlined />,
    key: 'system',
  },
];
const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [selectedKeys, _openKeys] = useMemo(() => {
    const { pathname } = location;
    const keys = pathname.slice(1).split('/').filter(Boolean);
    if (keys.length === 0) {
      return [['workspace'], []];
    }
    return [takeRight(keys), dropRight(keys)];
  }, [location]);

  const navigate = useNavigate();

  useEffect(() => {
    setOpenKeys(_openKeys);
  }, [_openKeys]);
  console.log('sdfsdfs', colorBgContainer);
  return (
    <Layout style={{ height: '100vh' }}>
      <Header
        style={{
          padding: 0,
          background: '#fff',
          position: 'relative',
          zIndex: 10,
          boxShadow:
            '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <Box
            sx={{
              fontSize: '32px',
              height: '100%',
              display: 'flex',
              userSelect: 'none',
              padding: '0 4px',
              alignItems: 'center',
            }}
          >
            <IconLogo
              style={{
                fontSize: '40px',
              }}
            />
            Loonflow
          </Box>
          <Avatar shape="square" icon={<UserOutlined />} />
        </Box>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          theme="light"
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            style={{
              height: '100%',
              borderRight: 0,
            }}
            mode="inline"
            items={items}
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={(openKeys) => {
              setOpenKeys(openKeys);
            }}
            onClick={({ key, keyPath }) => {
              if (key === 'workspace') {
                navigate('/', {
                  replace: true,
                });
                return;
              }
              navigate(`/${keyPath.reverse().join('/')}`, {
                replace: true,
              });
            }}
          />
        </Sider>
        <Layout
          style={{
            background: '#f5f5f5',
            padding: '16px',
            paddingBottom: '24px',
          }}
        >
          <Content
            style={{ background: colorBgContainer, borderRadius: '4px' }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Home;
