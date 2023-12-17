import { Box } from '@mui/system';
import FieldList from './FieldList';
import Layout from './Layout';
import FieldProps from './FieldProps';
import React, { useMemo } from 'react';
import { IFlowContext } from '@loonflow/schema';
import { FormDesignContext } from './context/FormDesignContext';

const FormDesign: React.FC<Pick<IFlowContext, 'onFormDesignErrorsChange'>> = ({
  onFormDesignErrorsChange,
}) => {
  const contextValue = useMemo(() => {
    return {
      onFormDesignErrorsChange,
    };
  }, [onFormDesignErrorsChange]);
  return (
    <FormDesignContext.Provider value={contextValue}>
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
    </FormDesignContext.Provider>
  );
};

export default FormDesign;
