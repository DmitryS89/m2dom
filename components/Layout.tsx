import Head from 'next/head';import Link from 'next/link';import { ReactNode } from 'react';
export default function Layout({children, t, locale}:{children:ReactNode, t:any, locale:string}){
return(<>
<Head><title>m2dom — modular homes 4×12 m</title>
<meta name='description' content='m2dom — круглогодичные модульные дома 4×12 м, металлическая рама, фанера, санузел, кухня.'/>
<meta property='og:title' content='m2dom — modular homes 4×12 m'/>
<meta property='og:description' content='Steel base frame, plywood interiors, winter‑ready. Delivery across Russia.'/>
<meta property='og:image' content='/og.jpg'/></Head>
<header className='sticky top-0 z-40 backdrop-blur border-b border-white/10 bg-neutral-950/70'>
  <div className='mx-auto max-w-6xl px-4 h-16 flex items-center justify-between'>
    <div className='flex items-center gap-3'>
      <img src='/logo.svg' alt='m2dom' className='h-7 w-7'/>
      <span className='font-semibold tracking-widest text-lg'>m2dom</span>
      <span className='ml-3 text-xs text-white/50'>{t.tag}</span></div>
    <nav className='hidden md:flex items-center gap-6 text-sm text-white/80'>
      <a href='#models' className='hover:text-white'>{t.models}</a>
      <a href='#specs' className='hover:text-white'>{t.specs}</a>
      <a href='#gallery' className='hover:text-white'>{t.gallery}</a>
      <a href='#pricing' className='hover:text-white'>{t.pricing}</a>
      <a href='#contact' className='hover:text-white'>{t.contact}</a>
    </nav>
    <div className='flex items-center gap-3 text-sm'>
      <Link href={locale==='ru'? '/?lang=en':'/?lang=ru'} className='text-white/60 hover:text-white'>{locale==='ru'? 'EN':'RU'}</Link>
    </div>
  </div></header><main>{children}</main>
<footer className='border-t border-white/10'><div className='mx-auto max-w-6xl px-4 py-10 grid md:grid-cols-3 gap-6 text-sm text-white/60'>
  <div><div className='font-semibold text-white'>m2dom</div><p className='mt-2'>Модульные дома 4×12 м. Круглогодично. Производство в РФ.</p></div>
  <div><div className='font-medium text-white'>Legal</div><ul className='mt-2 space-y-1'><li>© {new Date().getFullYear()} m2dom</li></ul></div>
  <div><div className='font-medium text-white'>Contact</div><ul className='mt-2 space-y-1'><li>hello@m2dom.house</li><li>+7 (900) 000‑00‑00</li></ul></div>
</div></footer></>) }