import { useContext, useState } from 'react';
import { Context } from '../Context';

export default function PageRankForm() {
  const { hideForms, graphData, getPageRank, showPageRankResult } = useContext(Context);
  const buttonClasses = 'bg-fuchsia-400 rounded-full text-white text-[1.5rem] font-medium py-1 px-4 hover:bg-fuchsia-500'
  const [numberOfIterations, setNumberOfIterations] = useState(10)
  const [errorMessage, setErrorMessage] = useState('')
  const [errorDisplay, setErrorDisplay] = useState('hidden')

  function handleChange(e) {
    setNumberOfIterations(e.target.value)
    setErrorDisplay('hidden')
    setErrorMessage(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(!numberOfIterations) {
        setErrorDisplay('block')
        setErrorMessage('Please enter any number from 10 to 100')
        return
    }
    hideForms()
    showPageRankResult(() => getPageRank(graphData, parseInt(numberOfIterations)))
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8 items-center relative'>
        <p
        className={`${errorDisplay} absolute text-base leading-tight text-red-500 top-[-32px]`}
      >
        *{errorMessage}
      </p>
      <div className='flex gap-8 flex-wrap items-center'>
        <label htmlFor="numberOfIterations" className='text-slate-800 text-2xl'>
          Enter number of iterations (10 - 100):{' '}
        </label>
        <input
          type="number"
          name="iterations"
          id="numberOfIterations"
          min={10}
          max={100}
          value={numberOfIterations}
          onChange={handleChange}
          className='border border-gray-400 p-2 rounded-lg text-slate-700 text-xl focus:outline-none focus:border-slate-500 invalid:focus:border-red-600'
        />
      </div>
      <div>
        <div className="flex flex-wrap gap-8">
          <button type="submit" className={buttonClasses}>
            Show PageRanks
          </button>
          <button onClick={hideForms} className={buttonClasses}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
