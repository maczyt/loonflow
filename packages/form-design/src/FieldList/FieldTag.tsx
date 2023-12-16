import { Field } from '@loonflow/schema';
import { Box } from '@mui/system';
import { FC, ReactNode } from 'react';

interface IProps {
  title: string;
  icon: ReactNode;
  fieldType: Field;
}
const FieldTag: FC<IProps> = ({ title, icon, fieldType }) => {
  return (
    <Box
      sx={{
        background: '#f7f8fa',
        borderRadius: '2px',
        display: 'flex',
        height: '36px',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'all 50ms',
        border: '1px solid transparent',
        '&:hover': {
          borderColor: '#155BD4',
          background: '#EDF4FF',
          color: '#155BD4',
        },
      }}
      data-field-type={fieldType}
      className="drag-field-item"
    >
      <Box
        sx={{
          fontSize: '16px',
          marginLeft: '10px',
          marginRight: '10px',
        }}
      >
        {icon}
      </Box>
      <Box
        sx={{
          fontSize: '14px',
        }}
      >
        {title}
      </Box>
    </Box>
  );
};

export default FieldTag;
