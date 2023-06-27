import type { NextApiRequest as Req, NextApiResponse as Res } from 'next'
import { getAcadWeekInfo } from 'lib/nusmods'

const w = getAcadWeekInfo(new Date())
const type = w.type === 'Instructional' ? '' : w.type

const parts = [
  `AY${w.year}`,
  w.sem || '',
  `${type} Week ${w.num || ''}`.trim(),
].filter(Boolean)

export default function handler(_: Req, res: Res) {
  return res.status(200).send(parts.join('   '))
}
