import { EdgeFormContextProvider } from '../../EdgeFormContext';
import FormContainer from './formElements/FormContainer';

export default function EdgeForm() {
  return (
    <EdgeFormContextProvider>
      <h2 className="text-4xl">Add Edges</h2>
      <FormContainer />
    </EdgeFormContextProvider>
  );
}
