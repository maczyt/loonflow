import FieldList from './FieldList';
import { Box } from '@mui/system';
import FieldProps from './FieldProps';

export function App() {
  return (
    <Box
      sx={{
        background: '#f7f8fa',
        display: 'grid',
        height: '100vh',
        overflow: 'hidden',
        gridTemplateColumns: '300px 1fr 300px',
      }}
    >
      <FieldList />
      <Box>sfds</Box>
      <FieldProps />
    </Box>
  );
}

export default App;
