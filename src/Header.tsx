import { useState } from "react";
import { names } from "./data.ts";

export function Header(
  { visibleData, setVisibleData, removeVisibleData }: {
    visibleData: string[];
    setVisibleData: (name: string) => void;
    removeVisibleData: (name: string) => void;
  },
) {
  const [value, setValue] = useState("");

  const suggestions = names.filter((name) => !visibleData.includes(name));

  return (
    <div className="bg-gray-200 p-3">
      <datalist id="names">
        {suggestions.map((name) => <option key={name} value={name} />)}
      </datalist>
      <input
        type="text"
        placeholder="Search"
        className="bg-white p-1"
        value={value}
        onChange={(e) => {
          console.log(e);
          if ("data" in e.nativeEvent) {
            setValue(e.target.value);
          } else {
            setVisibleData(e.target.value);
            setValue("");
          }
        }}
        list="names"
        onKeyUp={(e) => {
          if (e.key !== "Enter") return;

          setVisibleData(value);
          setValue("");
        }}
      />
      {visibleData.map((name) => (
        <div
          key={name}
          className="tag ml-2 bg-blue-300 p-1 text-sm inline-block relative cursor-pointer"
          onClick={() => removeVisibleData(name)}
        >
          {name}
          <div className="absolute top-0 left-0 bg-gray-100/60 w-full h-full content-center text-center text-lg invisible">
            X
          </div>
        </div>
      ))}
    </div>
  );
}
