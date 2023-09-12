import { Prop } from '@loonflow/schema';
import { FC } from 'react';
import { fieldPropsFactory } from '@loonflow/field-props';
import { observer } from 'mobx-react';

interface IProps {
  prop: Prop;
}
const PropSetting: FC<IProps> = ({ prop }) => {
  const Comp = fieldPropsFactory.get(prop.type);

  if (Comp) {
    return (
      <Comp
        disabled={prop.disabled}
        required={prop.required}
        value={prop.value}
        onChange={(v) => {
          prop.value = v;
        }}
      />
    );
  }
  return null;
};

export default observer(PropSetting);
