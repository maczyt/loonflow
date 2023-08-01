import { Prop } from '@loonflow/schema';
import { FC } from 'react';
import { fieldPropsFactory } from '@loonflow/field-props';
import { setProp } from '../store';

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
          setProp(prop.type, v);
        }}
      />
    );
  }
  return null;
};

export default PropSetting;
