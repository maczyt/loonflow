import { Box } from '@mui/system';
import FieldList from './FieldList';
import Layout from './Layout';
import FieldProps from './FieldProps';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const FormDesign = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        background: '#f7f8fa',
        display: 'grid',
        overflow: 'hidden',
        gridTemplateColumns: '300px 1fr 300px',
      }}
    >
      <DndProvider backend={HTML5Backend}>
        <FieldList />
        <Layout />
        <FieldProps />
      </DndProvider>
    </Box>
  );
};

export default FormDesign;
