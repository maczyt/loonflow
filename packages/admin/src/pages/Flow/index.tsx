import { FlowTabKeys, FlowTabs, isFlowTabKeys } from '@loonflow/schema';
import { Box } from '@mui/system';
import { Tabs } from 'antd';
import { useEffect, useMemo } from 'react';
import { match } from 'path-to-regexp';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const Flow = () => {
  const location = useLocation();
  const key = useMemo(() => {
    const matchObj = match('/flow/:flowId?/:tabKey')(location.pathname);
    // @ts-ignore
    const tabKey = matchObj?.params?.tabKey;
    return isFlowTabKeys(tabKey) ? tabKey : undefined;
  }, [location.pathname]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!key) {
      navigate(FlowTabKeys.basic, {
        replace: true,
      });
    }
  }, [key, navigate]);

  return (
    <Box
      sx={{
        background: '#F7F8FA',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          height: '56px',
          boxShadow: '0 1px #EBEDF0',
          background: '#fff',
          marginBottom: '1px',
          '.ant-tabs-nav': {
            margin: 0,
            height: '52px',
            '&:before': {
              display: 'none',
            },
          },
        }}
      >
        <Tabs
          centered
          tabBarGutter={32}
          activeKey={key}
          onChange={(key) => {
            navigate(key, {
              replace: true,
            });
          }}
          items={FlowTabs}
        />
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {<Outlet />}
      </Box>
    </Box>
  );
};

export default Flow;
