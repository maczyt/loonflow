import { IField } from '@loonflow/schema';
import { Button, Tooltip } from 'antd';
import { FC } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteField } from '../../store';

const Delete: FC<{ field: IField }> = ({ field }) => {
  return (
    <Tooltip placement="top" title="删除">
      <Button
        size="small"
        type="primary"
        danger
        onClick={(ev) => {
          deleteField(field);
        }}
      >
        <DeleteOutlined />
      </Button>
    </Tooltip>
  );
};

export default Delete;
