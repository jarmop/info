import { useState } from "react";
import "./App.css";

const data = [{
  name: "MySQL",
  date: "1995-5-23",
  description: "-",
}, {
  name: "Java",
  date: "1995-5-23",
  description: "- Java language project was initiated in 1991",
}, {
  name: "PHP",
  date: "1995-6-8",
  description: "-",
}, {
  name: "IMDB",
  date: "1990",
  description: "-",
}, {
  name: "Internet Explorer",
  date: "1995-8-24",
  description: "- Released with Windows 95",
}, {
  name: "JavaScript",
  date: "1995-12-4",
  description: "- developed by Brendan Eich at Netscape",
}] as const;

type Datum = typeof data[number];

function compare(a: Datum, b: Datum) {
  if (a.date < b.date) return -1;
  else if (a.date > b.date) return 1;
  else return 0;
}

const sortedData = data.toSorted(compare);

function App() {
  const [activeBox, setActiveBox] = useState("");

  return (
    <div className="m-2">
      <div className="-m-1">
        {sortedData.map((d) => (
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
      <div
        className="description invisible absolute z-10 border-2 p-2 m-1 -mt-2 top-full cursor-pointer w-max h-max min-w-full min-h-full"
        onClick={onClick}
      >
        <textarea
          className="resize-none field-sizing-content block cursor-pointer focus-visible:outline-0"
          readOnly
          defaultValue={d.description}
        />
      </div>
    </div>
  );
}

export default App;
