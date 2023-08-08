import { Box } from '@mui/system';
import {
  Link,
  Route,
  Routes,
  useLocation,
  useRoutes,
  useSearchParams,
} from 'react-router-dom';
import qs from 'qs';
import { Switch, Case } from 'react-if';
import Notification from './Notification';
import Permission from './Permission';
import Customize from './Customize';

const Tabs = [
  {
    key: 'notification',
    name: '通知设置',
  },
  {
    key: 'permission',
    name: '权限设置',
  },
  {
    key: 'customize',
    name: '定制设置',
  },
];
const Advance = () => {
  const location = useLocation();
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const activeTab = query.tab ?? 'notification';
  return (
    <Box
      sx={{
        width: '800px',
        margin: '18px auto 0',
        background: '#fff',
        height: 'calc(100% - 18px)',
        overflow: 'auto',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          borderRight: '1px solid #F2F3F5',
          width: '114px',
          padding: '16px',
          a: {
            textDecoration: 'none',
            color: '#323233',
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          fontSize: '14px',
        }}
      >
        {Tabs.map((tab) => (
          <Box
            key={tab.key}
            sx={{
              height: '32px',
              lineHeight: '32px',
              textAlign: 'center',
              background: activeTab === tab.key ? '#EBEDF0' : 'transparent',
              borderRadius: '2px',
            }}
          >
            <Link
              replace
              to={{
                pathname: `${location.pathname}`,
                search: qs.stringify(
                  { ...query, tab: tab.key },
                  { addQueryPrefix: true }
                ),
              }}
            >
              {tab.name}
            </Link>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          padding: '16px 24px',
          flex: 1,
        }}
      >
        <Switch>
          <Case condition={activeTab === 'notification'}>
            <Notification />
          </Case>
          <Case condition={activeTab === 'permission'}>
            <Permission />
          </Case>
          <Case condition={activeTab === 'customize'}>
            <Customize />
          </Case>
        </Switch>
      </Box>
    </Box>
  );
};

export default Advance;
