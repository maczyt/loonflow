import { IconPlaceholder } from '@loonflow/icon';
import { Box } from '@mui/system';

const Empty = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        pointerEvents: 'none',
      }}
    >
      <Box>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '1px',
            top: '16px',
            left: 0,
            borderBottom: '1px #DCDEE0 dashed',
          }}
        />
        <Box
          sx={{
            borderLeft: '1px #DCDEE0 dashed',
            height: '100%',
            top: 0,
            left: '16px',
            position: 'absolute',
            width: '1px',
          }}
        />
        <Box
          sx={{
            borderLeft: '1px #DCDEE0 dashed',
            height: '100%',
            top: 0,
            right: '16px',
            position: 'absolute',
            width: '1px',
          }}
        />
        <Box
          sx={{
            borderLeft: '1px #DCDEE0 dashed',
            borderRight: '1px #DCDEE0 dashed',
            height: '100%',
            top: 0,
            left: '50%',
            marginLeft: '-20px',
            position: 'absolute',
            width: '40px',
          }}
        />
      </Box>
      <IconPlaceholder
        style={{
          position: 'absolute',
          zIndex: 100,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  );
};

export default Empty;
