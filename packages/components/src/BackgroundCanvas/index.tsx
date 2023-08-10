import { FC, useCallback, useMemo } from 'react';
import { uid } from 'uid';
import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import { getOptions } from './config';
interface IProps {
  id?: string;
  className?: string;
}
export const BackgroundCanvas: FC<IProps> = ({ id, className }) => {
  const _id = useMemo(() => {
    return id ?? `tsparticles-${uid()}`;
  }, [id]);
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);
  return (
    <Particles
      className={className}
      id={_id}
      init={particlesInit}
      // @ts-ignore
      options={getOptions()}
    />
  );
};
