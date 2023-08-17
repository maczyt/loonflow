import * as ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'modern-normalize';
import { router } from './router';
import { initLng, Lng } from '@loonflow/locales';

initLng(navigator.language === 'en' ? Lng.en : Lng.zhCN).then(() => {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  root.render(<RouterProvider router={router} />);
});
