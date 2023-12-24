const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

const svgFiles = globSync(path.resolve(__dirname, '../src/*.svg'));
const basePath = path.resolve(__dirname, '../src');
const icons = svgFiles.map((file) => {
  return 'Icon' + file.replace(basePath, '').match(/\/([^.]+)\.svg/)[1]
});

fs.writeFileSync(path.resolve(__dirname, '../../../dist/packages/icon/index.d.ts'), `
  import type { FunctionComponent } from 'react';
  type TypeName = ${icons.map((key) => `'${key}'`).join(' | ')};
  export declare const icons: Record<TypeName, FunctionComponent<HTMLAttributes<HTMLOrSVGElement>>>;
  export default icons;
`, {
  encoding: 'utf-8',
})
