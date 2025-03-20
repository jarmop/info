import { useState } from "react";
import "./App.css";
import InlineBlocks from "./InlineBlocks.tsx";
import { Sidebar } from "./Sidebar.tsx";
import data from "./data.ts";

function App() {
  const [activeBox, setActiveBox] = useState("");

  return (
    <div className="flex flex-row">
      <InlineBlocks
        data={data}
        activeBox={activeBox}
        setActiveBox={setActiveBox}
      />
      <Sidebar datum={data.find((d) => d.name === activeBox)} />
    </div>
  );
}

export default App;
