const data = [{
  name: "MySQL",
  date: "1995-5-23",
  description: "-",
}, {
  name: "Netscape Navigator",
  date: "1994-10",
  description:
    "- Developed by people who had developed Mosaic browser for NCSA in 1993. They had started company called Mosaic Communications Corporation in April 1994, and in october of the same year they released Mosaic Netscape 0.9 which was soon renamed to Netscape Navigator. The company was also renamed to Netscape.\n- Internally referred to as Mozilla, meaning the Mosaic killer",
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

export type Datum = typeof data[number];

function compare(a: Datum, b: Datum) {
  if (a.date < b.date) return -1;
  else if (a.date > b.date) return 1;
  else return 0;
}

const sortedData = data.toSorted(compare);

export default sortedData;
