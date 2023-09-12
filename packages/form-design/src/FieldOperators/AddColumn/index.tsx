import { IField } from '@loonflow/schema';
import { Button, Tooltip } from 'antd';
import { FC } from 'react';
import { addColumnField } from '../../store';
import { IconFont } from '../../components/IconFont';

const AddColumn: FC<{ field: IField }> = ({ field }) => {
  return (
    <Tooltip placement="top" title="添加列">
      <Button
        size="small"
        type="primary"
        onClick={(ev) => {
          addColumnField(field);
        }}
      >
        <IconFont type="icon-add-column" />
      </Button>
    </Tooltip>
  );
};

export default AddColumn;
