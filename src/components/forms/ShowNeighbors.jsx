import React, { useContext, useState } from 'react';
import { Context } from '../../Context';
import FormElements from './formElements/FormElements';
import InputContainer from './formElements/InputContainer';

export default function ShowNeighbors() {
  const { graphData, hideForms } = useContext(Context);
  const [formData, setFormData] = useState({
    srcNode: 'A',
  });

  function handleChange(e) {
    setFormData({ [e.target.name]: e.target.value });
  }
  const neighborsDataElements = Object.keys(graphData).map((node) => {
    return (
      <InputContainer node={node} name="srcNode">
        <input
          className="hidden peer"
          type="radio"
          name="srcNode"
          defaultValue={node}
          checked={formData.srcNode === node}
          id={`src${node}`}
          onChange={handleChange}
        />
      </InputContainer>
    );
  });

  return (
    <div className="flex flex-col gap-9 items-center p-9 rounded-xl border border-slate-600">
      <h2 className="text-4xl">Show Neighbors</h2>
      <FormElements inputs={neighborsDataElements}>
        {graphData[formData.srcNode].length ? (
          <p className="text-slate-800 text-xl">
            '{formData.srcNode}' has direct paths towards{' '}
            {graphData[formData.srcNode].map((link) => (
              <span>'{link}' </span>
            ))}
          </p>
        ) : (
          <p className="text-slate-800 text-xl">
            '{formData.srcNode}' has no neighbors
          </p>
        )}
      </FormElements>
      <button
        onClick={hideForms}
        className="bg-fuchsia-400 rounded-full text-white text-[1.5rem] font-medium py-1 px-4 hover:bg-fuchsia-500"
      >
        Exit
      </button>
    </div>
  );
}
