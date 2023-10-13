import { Field } from '@loonflow/schema';
import { Fragment, ReactNode } from 'react';
import { IconMultiText, IconRow, IconSingleText } from '@loonflow/icon';
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
    icon: <IconSingleText />,
    title: '单行文本',
    category: Category.base,
  },
  {
    type: Field.textarea,
    icon: <IconMultiText />,
    title: '多行文本',
    category: Category.base,
  },
  {
    type: Field.row,
    icon: <IconRow />,
    title: '栅格布局',
    category: Category.layout,
  },
];

const fieldTagsMap: Record<string, typeof fieldTags> = fieldTags.reduce(
  (map, tag) => {
    if (!map[tag.category]) {
      map[tag.category] = [];
    }
    map[tag.category].push(tag);
    return map;
  },
  Object.create(null)
);

const FieldList = () => {
  return (
    <Box
      sx={{
        background: '#fff',
        padding: '0 24px',
        overflowY: 'auto',
      }}
    >
      <div>
        {Object.keys(fieldTagsMap).map((category) => {
          return (
            <Fragment key={category}>
              <Box
                component="h2"
                sx={{
                  fontSize: '14px',
                  color: '#323233',
                  marginTop: '24px',
                  marginBottom: '16px',
                }}
              >
                {category}
              </Box>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px 8px',
                }}
              >
                {fieldTagsMap[category].map((field) => {
                  return (
                    <FieldTag
                      key={field.type}
                      title={field.title}
                      icon={field.icon}
                      fieldType={field.type}
                    />
                  );
                })}
              </Box>
            </Fragment>
          );
        })}
      </div>
    </Box>
  );
};

export default FieldList;
