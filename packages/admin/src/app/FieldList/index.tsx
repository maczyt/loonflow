import { Field } from '@loonflow/schema';
import { ReactNode } from 'react';
import { SingleText } from '@loonflow/icon';
import FieldTag from './FieldTag';
import { Box } from '@mui/system';

enum Category {
  base = '基础控件',
  layout = '布局控件',
}

const fieldTags: Array<{
  type: Field;
  icon: ReactNode;
  title: string;
  category: string;
}> = [
  {
    type: Field.input,
    icon: <SingleText />,
    title: '单行文本',
    category: Category.base,
  },
];

const FieldList = () => {
  return (
    <Box
      sx={{
        background: '#fff',
      }}
    >
      <div>
        <h2>基础控件</h2>
        {fieldTags.map((field) => {
          return <FieldTag key={field.type} />;
        })}
      </div>
    </Box>
  );
};

export default FieldList;
