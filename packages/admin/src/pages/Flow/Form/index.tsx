import { FormDesign } from '@loonflow/form-design';
import { IFlowContext } from '@loonflow/schema';
import { useOutletContext } from 'react-router-dom';

const Form = () => {
  const { onFormDesignErrorsChange } = useOutletContext<IFlowContext>();
  return <FormDesign onFormDesignErrorsChange={onFormDesignErrorsChange} />;
};

export default Form;
