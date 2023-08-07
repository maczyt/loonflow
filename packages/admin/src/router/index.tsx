import { FlowTabKeys } from '@loonflow/schema';
import { createBrowserRouter } from 'react-router-dom';
import Flow from '../pages/Flow';
import { route as AdvanceRoute } from '../pages/Flow/Advance';
import Basic from '../pages/Flow/Basic';
import Form from '../pages/Flow/Form';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello World</div>,
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
        element: <div>process</div>,
      },
      {
        path: FlowTabKeys.advance,
        ...AdvanceRoute,
      },
    ],
  },
]);
