import { Box } from '@mui/system';
import FieldList from './FieldList';
import Layout from './Layout';
import FieldProps from './FieldProps';

const FormDesign = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: '#f7f8fa',
        display: 'grid',
        overflow: 'hidden',
        gridTemplateRows: '100%',
        gridTemplateColumns: '300px 1fr 300px',
      }}
    >
      <FieldList />
      <Layout />
      <FieldProps />
    </Box>
  );
};

export default FormDesign;
