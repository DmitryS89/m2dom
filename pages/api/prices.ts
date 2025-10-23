import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  const url = process.env.SHEETS_CSV_URL;
  if(!url) return res.json({base:780000,labor:120000,overhead:60000,logistics:40000,margin:22});
  try{
    const r = await fetch(url); const csv = await r.text();
    const [headerLine, ...rest] = csv.trim().split('\n'); const headers = headerLine.split(',');
    const idx = { base: headers.indexOf('Себестоимость материалов, ₽'), labor: headers.indexOf('Труд, ₽'), overhead: headers.indexOf('Косвенные, ₽'), logistics: headers.indexOf('Логистика, ₽'), margin: headers.indexOf('Маржа, %') };
    const first = rest[0].split(',');
    res.json({ base:+first[idx.base], labor:+first[idx.labor], overhead:+first[idx.overhead], logistics:+first[idx.logistics], margin:+first[idx.margin] });
  }catch(e){ res.json({base:780000,labor:120000,overhead:60000,logistics:40000,margin:22}); }
}