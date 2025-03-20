import { Datum } from "./data.ts";

function InlineBlocks(
  { data, activeBox, setActiveBox }: {
    data: Datum[];
    activeBox: string;
    setActiveBox: (name: string) => void;
  },
) {
  return (
    <div className="m-2">
      <div className="-m-1">
        {data.map((d) => (
          <Box
            key={d.name}
            d={d}
            onClick={() =>
              activeBox === d.name ? setActiveBox("") : setActiveBox(d.name)}
          />
        ))}
      </div>
    </div>
  );
}

function Box(
  { d, onClick }: { d: Datum; onClick: () => void },
) {
  return (
    <div className="box relative text-sm inline-block align-top">
      <div className="border-2 p-2 m-1 cursor-pointer">
        <h3 onClick={onClick}>
          {`${d.date} ${d.name}`}
        </h3>
      </div>
      <div className="description invisible absolute z-10 border-2 p-2 m-1 -mt-2 top-full cursor-pointer w-max h-max min-w-full min-h-full">
        <textarea
          className="resize-none field-sizing-content block cursor-pointer focus-visible:outline-0 max-w-100"
          readOnly
          defaultValue={d.description}
        />
      </div>
    </div>
  );
}

export default InlineBlocks;
