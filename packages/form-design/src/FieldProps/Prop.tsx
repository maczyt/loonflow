import { Prop } from '@loonflow/schema';
import { FC } from 'react';
import { fieldPropsFactory } from '@loonflow/field-props';
import { observer } from 'mobx-react';
import { Form } from 'antd';

interface IProps {
  prop: Prop;
}
const PropSetting: FC<IProps> = ({ prop }) => {
  const Comp = fieldPropsFactory.get(prop.type);

  if (Comp) {
    return (
      <Form.Item
        label={Comp.label}
        rules={prop.rules}
        required={prop.required}
        name={prop.type}
        validateFirst
      >
        <Comp disabled={prop.disabled} />
      </Form.Item>
    );
  }
  return null;
};

export default observer(PropSetting);
