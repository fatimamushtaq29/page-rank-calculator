import InputContainer from './components/InputContainer';
import { createContext, useState, useContext, useEffect } from 'react';
import { Context } from './Context';
const EdgeFormContext = createContext();

function EdgeFormContextProvider(props) {
  const { graphData, addEdges, hideForms } = useContext(Context);
  const [formData, setFormData] = useState({
    srcNode: 'A',
    toNode: [],
  });
  const [errorDisplay, setErrorDisplay] = useState('hidden');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const buttonClasses =
    'bg-fuchsia-400 rounded-full text-white text-[1.5rem] font-medium py-1 px-4 hover:bg-fuchsia-500';

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      toNode: graphData[formData.srcNode],
    }));
  }, [formData.srcNode, graphData]);

  useEffect(() => {
    if (errorDisplay === 'hidden' && isSubmitted) {
      addEdges(formData.srcNode, formData.toNode);
      hideForms();
    }
  }, [isSubmitted, errorDisplay]);

  function handleChangeForToNode(e, node) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      toNode: prevFormData.toNode.find((link) => link === node)
        ? prevFormData.toNode.filter((link) => link !== node)
        : [...prevFormData.toNode, node],
    }));
    setIsSubmitted(false);
    setErrorDisplay('hidden');
  }

  function handleChangeForSrcNode(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      srcNode: e.target.value,
    }));
    setIsSubmitted(false);
    setErrorDisplay('hidden');
  }
  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitted(true);
    if (!formData.srcNode) {
      setErrorDisplay('block');
      setErrorMessage('Please add a source node');
    }
    if (!formData.toNode.length) {
      setErrorDisplay('block');
      setErrorMessage('Please add at least one edge');
    }
  }
  console.log(formData);
  const srcNodeRadioElements = Object.keys(graphData).map((node) => {
    return (
      <InputContainer node={node} name="srcNode">
        <input
          className="hidden peer"
          type="radio"
          name="srcNode"
          defaultValue={node}
          checked={formData.srcNode === node}
          id={`src${node}`}
          onChange={handleChangeForSrcNode}
        />
      </InputContainer>
    );
  });
  const toNodeCheckboxElements = Object.keys(graphData).map((node) => {
    return (
      <InputContainer node={node} name="toNode">
        <input
          className="hidden peer"
          type="checkbox"
          name="toNode"
          checked={
            formData.toNode.find((link) => link === node) === node
              ? true
              : false
          }
          id={`to${node}`}
          onChange={(e) => handleChangeForToNode(e, node)}
          disabled={node === formData.srcNode && true}
        />
      </InputContainer>
    );
  });
  return (
    <EdgeFormContext.Provider
      value={{
        handleSubmit,
        errorDisplay,
        errorMessage,
        srcNodeRadioElements,
        toNodeCheckboxElements,
        formData,
        buttonClasses,
        hideForms,
      }}
    >
      {props.children}
    </EdgeFormContext.Provider>
  );
}

export { EdgeFormContextProvider, EdgeFormContext };
