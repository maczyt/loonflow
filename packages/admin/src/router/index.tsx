import { FlowTabKeys } from '@loonflow/schema';
import { createBrowserRouter } from 'react-router-dom';
import Flow from '../pages/Flow';
import { route as AdvanceRoute } from '../pages/Flow/Advance';
import Basic from '../pages/Flow/Basic';
import Form from '../pages/Flow/Form';
import Process from '../pages/Flow/Process';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/flow/:flowId?',
    element: <Flow />,

    children: [
      {
        index: true,
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
