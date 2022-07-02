import { useContext } from 'react';
import EdgeForm from './components/forms/EdgeForm';
import Graph from './components/Graph';
import Heading from './components/Heading';
import PageRankForm from './components//forms/PageRankForm';
import PageRankResult from './components/PageRankResult';
import ShowNeighbors from './components/forms/ShowNeighbors';
import { Context } from './Context';

export default function App() {
  const {
    graphData,
    addNode,
    showForms,
    isShowForms,
    showButtons,
    isDisplayPageRankResult,
  } = useContext(Context);
  const buttonClasses =
    'bg-fuchsia-400 rounded-full text-white text-[2rem] font-medium py-1.5 px-5 hover:bg-fuchsia-500';
  return (
    <div className="flex flex-col justify-center items-center gap-24 my-28 mx-8">
      <Heading />
      <Graph />
      {showButtons && (
        <div className="flex items-center justify-center gap-8 flex-wrap">
          <button onClick={addNode} className={buttonClasses}>
            Add Node
          </button>

          {/*'Add Edge' button will only be shown if there are at least 2 nodes in the graph*/}
          {Object.keys(graphData).length >= 2 && (
            <button
              onClick={() => showForms('edgeForm')}
              className={buttonClasses}
            >
              Add Edge
            </button>
          )}

          {/*'Show Neighbors' button will only be shown if there are at least 2 nodes in the graph*/}
          {Object.keys(graphData).length >= 2 && (
            <button
              onClick={() => showForms('neighbors')}
              className={buttonClasses}
            >
              Show Neighbors
            </button>
          )}

          {/*'Show PageRank' button will only be shown if there are at least 2 nodes in the graph*/}
          {Object.keys(graphData).length >= 2 && (
            <button
              onClick={() => showForms('pageRankForm')}
              className={buttonClasses}
            >
              Show PageRank
            </button>
          )}
        </div>
      )}

      {isShowForms.edgeForm && <EdgeForm />}
      {isShowForms.neighbors && <ShowNeighbors />}
      {isShowForms.pageRankForm && <PageRankForm />}
      {isDisplayPageRankResult && <PageRankResult />}
    </div>
  );
}
