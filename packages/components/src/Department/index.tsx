import { Box } from '@mui/system';
import { Tree, TreeDataNode } from 'antd';

export const Department = () => {
  const treeData: TreeDataNode[] = [
    {
      title: 'parent',
      key: '0',
      children: [
        {
          title: 'child 1',
          key: '0-0',
          disabled: true,
        },
        {
          title: 'child 2',
          key: '0-1',
          disableCheckbox: true,
        },
      ],
    },
  ];
  return (
    <Box>
      <Tree treeData={treeData} blockNode />
    </Box>
  );
};
