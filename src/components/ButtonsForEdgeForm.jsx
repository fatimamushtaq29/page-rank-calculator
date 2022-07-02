import { useContext } from 'react';
import { EdgeFormContext } from '../EdgeFormContext';

export default function ButtonsForEdgeForm() {
  const { buttonClasses, hideForms } = useContext(EdgeFormContext);
  return (
    <div className="flex flex-wrap gap-8">
      <button type="submit" className={buttonClasses}>
        Add Edge
      </button>
      <button onClick={hideForms} className={buttonClasses}>
        Cancel
      </button>
    </div>
  );
}
