import { Field } from '@loonflow/schema';
import { ReactNode } from 'react';
import { MultiText, SingleText } from '@loonflow/icon';
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
  {
    type: Field.textarea,
    icon: <MultiText />,
    title: '多行文本',
    category: Category.base,
  },
];

const FieldList = () => {
  return (
    <Box
      sx={{
        background: '#fff',
        padding: '0 24px',
      }}
    >
      <div>
        <Box
          component="h2"
          sx={{
            fontSize: '14px',
            color: '#323233',
            marginTop: '24px',
            marginBottom: '16px',
          }}
        >
          基础控件
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px 8px',
          }}
        >
          {fieldTags.map((field) => {
            return (
              <FieldTag
                key={field.type}
                title={field.title}
                icon={field.icon}
              />
            );
          })}
        </Box>
      </div>
    </Box>
  );
};

export default FieldList;
