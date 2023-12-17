import {
  AdvanceFieldProps,
  BasicFieldProps,
  FieldTitle,
} from '@loonflow/schema';
import { Box } from '@mui/system';
import { Form, Tabs, Typography } from 'antd';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { store } from '../store';
import PropSetting from './Prop';

const Props: React.FC = () => {
  const [tabKey, setTabKey] = useState('basic');
  const [form] = Form.useForm();
  const basicFieldProps = store.activeField?.props?.filter((prop) =>
    BasicFieldProps.includes(prop.type)
  );
  const advanceFieldProps = store.activeField?.props?.filter((prop) =>
    AdvanceFieldProps.includes(prop.type)
  );

  useEffect(() => {
    const newState = store.activeField.props?.reduce((map, prop) => {
      map[prop.type] = prop.value;
      return map;
    }, Object.create(null));
    form.setFieldsValue(newState);
  }, [store.activeField]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '.ant-tabs': {
          overflow: 'hidden',
        },
        '.ant-tabs-content': {
          height: '100%',
          overflow: 'auto',
          padding: '0 16px',
        },
      }}
    >
      <Typography.Title
        level={2}
        style={{ fontSize: '18px', margin: '24px 16px 12px' }}
      >
        {FieldTitle[store.activeField?.type]}
      </Typography.Title>
      <Form
        form={form}
        layout="vertical"
        validateTrigger="onChange"
        onFieldsChange={(changedFields) => {
          changedFields.forEach((field) => {
            if (field.validating) return;
            const [name] = field.name;
            const value = field.value;
            // trigger change
            const prop = store.activeField.props?.find(
              (prop) => prop.type === name
            );
            if (!prop) return;
            prop.value = value;

            const fieldsError = form.getFieldsError();
            store.errors.set(
              store.activeFieldId,
              fieldsError.reduce(
                (arr, field) => [
                  ...arr,
                  [field.name[0] as string, field.errors],
                ],
                [] as any[]
              )
            );
          });
        }}
      >
        <Tabs
          activeKey={tabKey}
          tabBarStyle={{
            padding: '0 16px',
          }}
          style={{
            flex: 1,
          }}
          items={[
            {
              key: 'basic',
              label: '基础设置',
              children: (
                <Box>
                  {basicFieldProps?.map((prop, index) => {
                    return <PropSetting prop={prop} key={index} />;
                  })}
                </Box>
              ),
            },
            {
              key: 'advance',
              label: '高级设置',
              children: (
                <Box>
                  {advanceFieldProps?.map((prop, index) => {
                    return <PropSetting prop={prop} key={index} />;
                  })}
                </Box>
              ),
            },
          ]}
          onChange={(key) => {
            setTabKey(key);
          }}
        />
      </Form>
    </Box>
  );
};

export default observer(Props);
