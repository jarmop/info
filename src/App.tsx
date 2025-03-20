import { useState } from "react";
import "./App.css";
import InlineBlocks from "./InlineBlocks.tsx";
import { Sidebar } from "./Sidebar.tsx";
import { data } from "./data.ts";
import { Header } from "./Header.tsx";

function App() {
  const [activeBox, setActiveBox] = useState("");
  const [visibleData, setVisibleData] = useState<string[]>([]);

  return (
    <>
      <Header
        visibleData={visibleData}
        setVisibleData={(name: string) =>
          !visibleData.includes(name) && setVisibleData([...visibleData, name])}
        removeVisibleData={(name: string) =>
          setVisibleData(visibleData.filter((n) => n !== name))}
      />
      <div className="flex flex-row">
        <InlineBlocks
          data={data}
          activeBox={activeBox}
          setActiveBox={setActiveBox}
        />
        <Sidebar datum={data.find((d) => d.name === activeBox)} />
      </div>
    </>
  );
}

export default App;
