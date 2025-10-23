import { useRouter } from 'next/router'; import Head from 'next/head'; import Layout from '../components/Layout'; import Calculator from '../components/Calculator'; import ru from '../locales/ru.json'; import en from '../locales/en.json'; import { useState } from 'react';
export default function Home(){ const router=useRouter(); const locale = (router.query.lang==='en')?'en':'ru'; const t:any = locale==='ru'?ru:en; const [sent,setSent]=useState(false);
async function onSubmit(e:any){ e.preventDefault(); const fd=new FormData(e.currentTarget); const body:any=Object.fromEntries(fd.entries()); const r=await fetch('/api/lead',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); if(r.ok) setSent(true); }
return(<Layout t={t} locale={locale}>
<Head><link rel='icon' href='/logo.svg' /></Head>
<section className='mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center'><div>
  <h1 className='text-4xl md:text-6xl font-medium tracking-tight leading-[1.1]'>{t.hero_title}</h1>
  <p className='mt-5 text-white/70 text-lg max-w-xl'>{t.hero_sub}</p>
  <div className='mt-8 flex items-center gap-3'><a href='#pricing' className='inline-flex bg-white text-black hover:bg-white/90 rounded px-5 py-3 text-sm'>{t.cta_prices}</a>
  <a href='#contact' className='inline-flex border border-white/20 text-white hover:bg-white/10 rounded px-5 py-3 text-sm'>{t.cta_quote}</a></div></div>
  <div className='aspect-[16/10] md:aspect-[5/4] rounded-2xl bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0))] shadow-2xl ring-1 ring-white/10 flex items-center justify-center'><div className='text-white/40'>Hero Image</div></div>
</section>
<section id='models' className='mx-auto max-w-6xl px-4 py-8'><h2 className='text-3xl md:text-4xl font-semibold mb-3'>{t.model_name}</h2>
<p className='text-white/70 mb-6'>Интерьер из фанеры под масло, фасад HPL/фиброцемент, панорамные окна с лёгким наклоном, скрытая подсветка. Базовый комплект включает санузел и кухню без техники.</p>
<Calculator/></section>
<section id='specs' className='mx-auto max-w-6xl px-4 py-8 grid md:grid-cols-2 gap-8'><ul className='space-y-3'>
{['Стены: 150 мм минвата','Пол/кровля: 200 мм','Каркас 45×145; рама: профиль 80×80×4 + швеллер','Пароизоляция Sd ≥ 20–50 м; вентзазор 30–40 мм','Окна ПВХ 70 мм, 2-камерный СП','Санузел и кухня без техники в базе'].map((x,i)=>(<li key={i} className='flex gap-2 items-start'><span>•</span><span>{x}</span></li>))}
</ul><div className='rounded-xl border border-white/10 p-5 bg-neutral-900/50'><h4 className='text-lg font-semibold mb-3'>Логистика</h4>
<p className='text-sm text-white/70'>Ширина 4 м — негабарит II категории: спецразрешение и маршрут. Монтаж на участке — 1–2 дня при готовом свайном поле.</p></div></section>
<section id='gallery' className='mx-auto max-w-6xl px-4 py-8'><h3 className='text-2xl md:text-3xl font-semibold mb-6'>{t.gallery}</h3>
<div className='grid md:grid-cols-3 gap-4'>{[1,2,3,4,5,6].map(i=>(<div key={i} className='aspect-[4/3] rounded-xl bg-[linear-gradient(120deg,rgba(255,255,255,0.06),rgba(255,255,255,0))] ring-1 ring-white/10 flex items-center justify-center text-white/40'>Фото {i}</div>))}</div></section>
<section id='pricing' className='mx-auto max-w-6xl px-4 py-12'><h3 className='text-2xl md:text-3xl font-semibold mb-6'>{t.pricing}</h3>
<div className='grid md:grid-cols-3 gap-6'>{['Базовый','Зима+','PRO'].map((tier, idx)=>(<div key={tier} className={`border ${idx===1? 'border-emerald-400/40 bg-emerald-500/5':'border-white/10 bg-neutral-900/50'} rounded-xl p-5`}>
<div className='flex items-baseline justify-between'><span>{tier}</span><span className='text-2xl font-semibold'>{['1 000 000 ₽','1 190 000 ₽','1 350 000 ₽'][idx]}</span></div>
<ul className='mt-3 text-sm text-white/80 space-y-2'>
{idx===0 && ['Корпус 4×12 м, каркас + рама','Утепление: стены 150 мм, пол/кровля 200 мм','Интерьер: фанера под масло','Кухня без техники, санузел'].map(x=>(<li key={x}>• {x}</li>))}
{idx===1 && ['Окна теплее, доп. утепление узлов','Децентр. вентиляция, тёплый пол в санузле','Фасад HPL улучшенный'].map(x=>(<li key={x}>• {x}</li>))}
{idx===2 && ['Рекуперация/ПВУ, смарт-щит','Архитектурная подсветка','Фасад premium, доп. электропакет'].map(x=>(<li key={x}>• {x}</li>))}
</ul><a href='#contact' className='inline-flex mt-4 w-full justify-center bg-white text-black hover:bg-white/90 rounded px-5 py-3 text-sm'>Выбрать</a></div>))}</div></section>
<section id='contact' className='mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-2 gap-8 items-center'><div><h3 className='text-3xl font-semibold'>Запросить предложение</h3>
<p className='text-white/70 mt-2 max-w-prose'>Оставьте контакты — пришлём смету и 3D‑планировку под вашу задачу. Работаем по РФ.</p></div>
<div className='rounded-xl border border-white/10 p-5 bg-neutral-900/50'>{sent?(<div className='text-center py-10'><h4 className='text-xl font-medium'>{t.thanks}</h4></div>):(
<form onSubmit={onSubmit} className='grid gap-3'><input name='name' required placeholder='Ваше имя' className='bg-black/30 px-3 py-2 rounded border border-white/10'/>
<input name='email' required type='email' placeholder='Email' className='bg-black/30 px-3 py-2 rounded border border-white/10'/>
<input name='phone' placeholder='Телефон' className='bg-black/30 px-3 py-2 rounded border border-white/10'/>
<textarea name='message' placeholder='Кратко опишите участок / задачу' className='bg-black/30 px-3 py-2 rounded border border-white/10 min-h-[120px]'/>
<button type='submit' className='bg-white text-black hover:bg-white/90 rounded px-5 py-3 text-sm'>{t.send}</button></form>)}
</div></section>
</Layout>) }