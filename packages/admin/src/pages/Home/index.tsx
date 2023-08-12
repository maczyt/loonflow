import { Breadcrumb, Layout, Menu, MenuProps } from 'antd';
import { DesktopOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
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
  const location = useLocation();
  const [selectedKeys, openKeys] = useMemo(() => {
    const { pathname } = location;
    const keys = pathname.slice(1).split('/').filter(Boolean);
    console.log('dasda', keys);
    if (keys.length === 0) {
      return [['workspace'], []];
    }
    return [takeRight(keys), dropRight(keys)];
  }, [location]);

  const navigate = useNavigate();
  console.log('location', selectedKeys, openKeys);
  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Box
          sx={{
            fontSize: '32px',
            color: '#fff',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            userSelect: 'none',
            padding: '0 4px',
            justifyContent: 'center',
          }}
        >
          <IconLogo
            style={{
              fontSize: '40px',
            }}
          />
          {collapsed ? '' : 'Loonflow'}
        </Box>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          selectedKeys={selectedKeys}
          defaultOpenKeys={openKeys}
          onClick={({ item, key, keyPath, domEvent }) => {
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
      <Layout>
        <Header style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
