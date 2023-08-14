import { FlowTabKeys } from '@loonflow/schema';
import { createBrowserRouter } from 'react-router-dom';
import Flow from '../pages/Flow';
import { route as AdvanceRoute } from '../pages/Flow/Advance';
import Basic from '../pages/Flow/Basic';
import Form from '../pages/Flow/Form';
import Process from '../pages/Flow/Process';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Organize from '../pages/Organize';
import Manage from '../pages/Organize/pages/Manage';
import Roles from '../pages/Organize/pages/Roles';
import System from '../pages/System';
import WorkFlow from '../pages/WorkFlow';
import WorkOrder from '../pages/WorkOrder';
import Todo from '../pages/WorkOrder/pages/Todo';
import WorkSpace from '../pages/WorkSpace';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        index: true,
        element: <WorkSpace />,
      },
      {
        path: 'workorder',
        element: <WorkOrder />,
        children: [
          {
            path: 'todo',
            element: <Todo />,
          },
        ],
      },
      {
        path: 'workflow',
        element: <WorkFlow />,
      },
      {
        path: 'organize',
        element: <Organize />,
        children: [
          {
            path: 'manage',
            element: <Manage />,
          },
          {
            path: 'role',
            element: <Roles />,
          },
        ],
      },
      {
        path: 'system',
        element: <System />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
    loader: async (...args) => {
      console.log('args', args);
      return [1, 2, 3];
    },
    action: async (...args) => {
      console.log('action', args);
    },
  },
  {
    path: '/flow/:flowId?',
    element: <Flow />,

    children: [
      {
        path: FlowTabKeys.basic,
        element: <Basic />,
      },
      {
        path: FlowTabKeys.form,
        element: <Form />,
      },
      {
        path: FlowTabKeys.process,
        element: <Process />,
      },
      {
        path: FlowTabKeys.advance,
        ...AdvanceRoute,
      },
    ],
  },
]);
