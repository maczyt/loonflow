import { IField } from '@loonflow/schema';
import { FC } from 'react';
import { useSnapshot } from 'valtio';
import { store } from '../store';

const Render: FC = () => {
  const snap = useSnapshot(store);
  console.log(snap.fields);
  return <div></div>;
};

export default Render;
