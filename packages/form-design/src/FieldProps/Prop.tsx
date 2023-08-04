import { Prop } from '@loonflow/schema';
import { FC } from 'react';
import { fieldPropsFactory } from '@loonflow/field-props';

interface IProps {
  prop: Prop;
}
const PropSetting: FC<IProps> = ({ prop }) => {
  const Comp = fieldPropsFactory.get(prop.type);

  if (Comp) {
    return (
      <Comp
        value={prop.value}
        onChange={(v) => {
          prop.value = v;
        }}
      />
    );
  }
  return null;
};

export default PropSetting;
