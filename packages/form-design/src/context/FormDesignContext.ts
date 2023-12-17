import { IFlowContext } from '@loonflow/schema';
import { createContext, useContext } from 'react';

export const FormDesignContext = createContext<
  Pick<IFlowContext, 'onFormDesignErrorsChange'>
>({
  onFormDesignErrorsChange() {
    //
  },
});

export const useFormDesignContext = () => useContext(FormDesignContext);
