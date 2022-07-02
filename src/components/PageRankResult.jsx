import { useContext } from 'react';
import { Context } from '../Context';

export default function PageRankResult() {
  const { pageRanks, hidePageRankResult } = useContext(Context);
  console.log(pageRanks);
  const pageRankElements = Object.entries(pageRanks).map((node) => {
    return (
      <p className="text-xl">
        Page Rank for node{' '}
        <span className="text-red-500 font-medium">{node[0]}</span> is{' '}
        <span className="text-red-500 font-medium">{node[1]}</span>
      </p>
    );
  });
  return (
    <div className="flex flex-col gap-9 items-center p-9 rounded-xl border border-slate-600">
      <div>{pageRankElements}</div>
      <button
        onClick={hidePageRankResult}
        className="bg-fuchsia-400 rounded-full text-white text-[1.5rem] font-medium py-1 px-4 hover:bg-fuchsia-500"
      >
        Exit
      </button>
    </div>
  );
}
