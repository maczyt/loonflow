import {
  FlowTabKeys,
  FlowTabs,
  IFlowContext,
  isFlowTabKeys,
} from '@loonflow/schema';
import { Box } from '@mui/system';
import { Button, Tabs } from 'antd';
import { useEffect, useMemo } from 'react';
import { match } from 'path-to-regexp';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getLogicFlow } from '@loonflow/process-design';

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
          position: 'relative',
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

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: '16px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              const lf = getLogicFlow();
              console.log(lf, 'lf----');
            }}
          >
            保存
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          overflow: 'hidden',
        }}
      >
        {
          <Outlet
            context={
              {
                onFormDesignErrorsChange(erros) {
                  console.log('adhakdjh', erros);
                },
              } satisfies IFlowContext
            }
          />
        }
      </Box>
    </Box>
  );
};

export default Flow;
