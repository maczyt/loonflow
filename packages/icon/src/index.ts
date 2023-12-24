import { FunctionComponent, HTMLAttributes } from 'react';

const eagerImportModules = import.meta.glob('./*.svg', {
  eager: true,
}) satisfies Record<
  string,
  {
    ReactComponent: FunctionComponent<HTMLAttributes<HTMLOrSVGElement>>;
  }
>;

export const icons = Object.keys(eagerImportModules).reduce((result, key) => {
  const moduleName = key.match(/\/([^.]+)\.svg/)?.[1];
  result[`Icon${moduleName}`] = eagerImportModules[key].ReactComponent;
  return result;
}, Object.create(null));
export default icons;
