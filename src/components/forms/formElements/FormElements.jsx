export default function FormElements({ children, inputs }) {
  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="grid grid-flow-col grid-rows-3 auto-cols-min gap-6">
        {inputs}
      </div>
      {children}
    </div>
  );
}
