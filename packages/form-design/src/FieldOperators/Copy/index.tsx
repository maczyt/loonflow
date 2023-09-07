import { IField } from '@loonflow/schema';
import { Button, Tooltip } from 'antd';
import { FC } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { copyField } from '../../store';

const Copy: FC<{ field: IField }> = ({ field }) => {
  return (
    <Tooltip placement="top" title="复制">
      <Button
        size="small"
        type="primary"
        onClick={(ev) => {
          console.log('sdfsdfs');
          copyField(field);
        }}
      >
        <CopyOutlined />
      </Button>
    </Tooltip>
  );
};

export default Copy;
