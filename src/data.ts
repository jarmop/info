import { useMemo } from 'react'
import { useVisibleData } from './store.ts'

const rawData = [{
  name: 'MySQL',
  date: '1995-5-23',
  description: '-',
}, {
  name: 'ARPANET',
  date: '1969',
  description:
    '- Advanced Research Projects Agency Network\n- the first wide-area packet-switched network with distributed control and one of the first computer networks to implement the TCP/IP protocol suite. Both technologies became the technical foundation of the Internet.\n- Initiated in 1966, first computers connected in 1969',
}, {
  name: 'Netscape Navigator',
  date: '1994-10',
  tags: ['Mosaic', 'browser', 'NCSA', 'Netscape', 'Mozilla', 'Internet', 'Web'],
  description:
    '- Developed by people who had developed Mosaic browser for NCSA in 1993. They had started company called Mosaic Communications Corporation in April 1994, and in october of the same year they released Mosaic Netscape 0.9 which was soon renamed to Netscape Navigator. The company was also renamed to Netscape.\n- Internally referred to as Mozilla, meaning the Mosaic killer',
}, {
  name: 'Java',
  date: '1995-5-23',
  description: '- Java language project was initiated in 1991',
}, {
  name: 'PHP',
  date: '1995-6-8',
  description: '-',
}, {
  name: 'TCP (Transmission Control Protocol)',
  date: '1974',
  description: '-',
  tags: ['RFC'],
}, {
  name: 'UDP (User Datagram Protocol)',
  date: '1980',
  description: '-',
  tags: ['RFC'],
}, {
  name: 'SSL (Secure Sockets Layer)',
  date: '1994',
  description: '-',
  tags: ['RFC', 'security'],
}, {
  name: 'TLS (Transport Layer Security)',
  date: '1999',
  description: '-',
  tags: ['RFC', 'security'],
}, {
  name: '(DTLS) Datagram Transport Layer Security',
  date: '2008',
  description: '-',
  tags: ['RFC', 'security'],
}, {
  name: 'IMDB',
  date: '1990',
  description: '-',
}, {
  name: 'Internet Explorer',
  date: '1995-8-24',
  description: '- Released with Windows 95',
}, {
  name: 'JavaScript',
  date: '1995-12-4',
  description: '- developed by Brendan Eich at Netscape',
}] as const

export type Datum = typeof rawData[number]

function compare(a: Datum, b: Datum) {
  if (a.date < b.date) return -1
  else if (a.date > b.date) return 1
  else return 0
}

export const data = rawData.toSorted(compare)

export const names = data.map((d) => d.name)

export function useData() {
  const { visibleData } = useVisibleData()
  const filteredData = useMemo(
    () => data.filter((d) => visibleData.includes(d.name)),
    [visibleData],
  )
  return filteredData
}
