export default function GraphNode({ nodeName }) {
  return (
    <div className="bg-violet-400 rounded-[50%] h-10 w-10">
      <p className="text-[1.5rem] leading-[2.5rem] text-center">{nodeName}</p>
    </div>
  );
}
