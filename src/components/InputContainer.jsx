export default function InputContainer({ children, node, name }) {
  return (
    <div className=" h-8 w-8 flex items-center justify-center ">
      {children}
      <label
        htmlFor={name === 'srcNode' ? `src${node}` : `to${node}`}
        className="bg-violet-100 text-lg w-full text-center rounded-md
                 hover:bg-violet-200 peer-disabled:text-slate-400 peer-disabled:hover:bg-violet-100 peer-checked:bg-violet-400"
      >
        {node}
      </label>
    </div>
  );
}
