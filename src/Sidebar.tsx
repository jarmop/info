import { Datum } from "./data.ts";

export function Sidebar({ datum }: { datum?: Datum }) {
  return (
    <div className="w-100 bg-gray-100 p-2">
      <input
        type="text"
        defaultValue={datum?.name}
        className="bg-white p-2 w-full"
      />
      <textarea
        className="resize bg-white p-2 field-sizing-content block mt-2 w-full min-h-50"
        defaultValue={datum?.description}
      />
      <div className="flex justify-between mt-4">
        <button
          type="button"
          className="bg-green-300 p-1 cursor-pointer hover:bg-green-500"
        >
          Save
        </button>
        <button
          type="button"
          className="bg-green-300 p-1 cursor-pointer hover:bg-green-500"
        >
          Create new
        </button>
      </div>
    </div>
  );
}
