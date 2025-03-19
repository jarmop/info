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

data.toSorted(compare);

function App() {
  return (
    <div className="m-2">
      <div className="grid">
        {data.map((d) => (
          <div key={d.name} className="box border-2 p-2 text-sm">
            <h3>{`${d.date} ${d.name}`}</h3>
            <div className="description">
              <textarea
                className="resize-none block"
                readOnly
                defaultValue={d.description}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
