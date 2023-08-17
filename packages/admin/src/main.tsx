import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'modern-normalize';
import { router } from './router';
import { initLng } from '@loonflow/locales';

initLng().then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(<RouterProvider router={router} />);
});
