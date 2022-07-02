import { useContext } from 'react';
import { EdgeFormContext } from '../EdgeFormContext';
import ButtonsForEdgeForm from './ButtonsForEdgeForm';
import FormElements from './FormElements';

export default function FormContainer() {
  const {
    handleSubmit,
    errorDisplay,
    errorMessage,
    srcNodeRadioElements,
    toNodeCheckboxElements,
    formData,
  } = useContext(EdgeFormContext);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8 items-center relative"
    >
      <p
        className={`${errorDisplay} absolute text-base leading-tight text-red-500 top-[-32px]`}
      >
        *{errorMessage}
      </p>
      <div className="flex gap-12">
        <FormElements inputs={srcNodeRadioElements}>
          <p className="text-slate-800">Select node to add links/edges to</p>
        </FormElements>
        <FormElements inputs={toNodeCheckboxElements}>
          <p className="text-slate-800">
            Select at least one edge that '{formData.srcNode}' will link to
          </p>
        </FormElements>
      </div>
      <ButtonsForEdgeForm />
    </form>
  );
}
