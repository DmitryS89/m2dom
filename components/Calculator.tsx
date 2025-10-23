import { useState, useMemo, useEffect } from 'react';
type Inputs = { base:number; labor:number; overhead:number; logistics:number; margin:number };
export default function Calculator(){
  const [inputs, set] = useState<Inputs>({base:780000, labor:120000, overhead:60000, logistics:40000, margin:22});
  const [loaded, setLoaded] = useState(false);
  useEffect(()=>{
    (async ()=>{
      try{
        const r = await fetch('/api/prices'); if(!r.ok) throw 0;
        const data = await r.json();
        if(data && data.base){ set(prev=>({...prev, base:data.base, labor:data.labor, overhead:data.overhead, logistics:data.logistics, margin:data.margin})); }
      }catch(e){/*silent*/} finally{ setLoaded(true);}
    })();
  },[]);
  const cost = useMemo(()=>inputs.base+inputs.labor+inputs.overhead+inputs.logistics,[inputs]);
  const price = useMemo(()=> Math.round(cost*(1+inputs.margin/100)),[cost, inputs.margin]);
  return(<div className='rounded-xl border border-white/10 p-5 bg-neutral-900/50'>
    <h4 className='text-lg font-semibold mb-3'>Калькулятор цены {loaded?'':'(значения по умолчанию)'}</h4>
    <div className='grid sm:grid-cols-2 gap-3 text-sm'>
      {Object.entries(inputs).map(([k,v])=> (<label key={k} className='flex items-center justify-between gap-3'>
        <span className='capitalize'>{k}</span>
        <input className='bg-black/30 px-3 py-2 rounded border border-white/10 w-40' type='number' value={v}
          onChange={e=>set(prev=>({...prev,[k]: +e.target.value}))}/>
      </label>))}
    </div>
    <div className='mt-4 text-sm space-y-1'><div>Себестоимость: <b>{cost.toLocaleString('ru-RU')} ₽</b></div>
      <div>Розничная цена: <b>{price.toLocaleString('ru-RU')} ₽</b></div></div>
    <p className='text-xs text-white/50 mt-2'>* Можно подключить Google Sheets (см. .env: SHEETS_CSV_URL) — цены подтянутся автоматически.</p>
  </div>) }