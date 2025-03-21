import { Fragment, useEffect, useState } from "react";
import { Datum } from "./data.ts";

// const years: number[] = [];
// for (let i = 1900; i < 2026; i++) {
//   years.push(i);
// }

interface TimelineProps {
  data: Datum[];
}

export function Timeline({ data }: TimelineProps) {
  const [dataByYear, setDataByYear] = useState<Record<string, Datum[]>>({});

  useEffect(() => {
    const newDataByYear: typeof dataByYear = {};

    data.forEach((d) => {
      const year = d.date.split("-")[0];
      if (!newDataByYear[year]) {
        newDataByYear[year] = [];
      }
      newDataByYear[year].push(d);
    });
    setDataByYear(newDataByYear);
  }, [data]);

  return (
    <div className="grid grid-cols-2">
      {Object.entries(dataByYear).map(([year, data]) => (
        <Fragment key={year}>
          <div className="p-2">{year}</div>
          <div className="p-2">
            {data?.map((d) => <div key={d.name}>{d.name}</div>)}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

// export function Timeline() {
//   return (
//     <table>
//       <thead>
//         <th></th>
//         <th>Computers</th>
//       </thead>
//       <tbody>
//         {years.map((year) => (
//             <tr>
//               <th>{year}</th>
//               <td>foo</td>
//             </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }
