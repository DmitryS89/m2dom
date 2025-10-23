import type { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(req: NextApiRequest, res: NextApiResponse){
  if(req.method!=='POST') return res.status(405).json({ok:false});
  const { name, email, phone, message } = req.body || {};
  const text = ['🧱 New m2dom lead',`Name: ${name||'-'}`,`Email: ${email||'-'}`,`Phone: ${phone||'-'}`,`Message: ${message||'-'}`].join('\n');
  const tgToken = process.env.TELEGRAM_BOT_TOKEN; const tgChat = process.env.TELEGRAM_CHAT_ID;
  try { if(tgToken && tgChat){ await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({chat_id:tgChat,text})}); } } catch(e){ console.error(e); }
  try {
    const key = process.env.RESEND_API_KEY; const to = process.env.RESEND_TO; const from = process.env.RESEND_FROM || 'm2dom <noreply@m2dom.house>';
    if(key && to){
      await fetch('https://api.resend.com/emails',{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${key}`},
        body: JSON.stringify({ from, to:[to], subject:'Новая заявка m2dom', html:`<b>Имя:</b> ${name||'-'}<br/><b>Email:</b> ${email||'-'}<br/><b>Телефон:</b> ${phone||'-'}<br/><b>Сообщение:</b> ${message||'-'}` })
      });
    }
  } catch(e){ console.error(e); }
  res.json({ok:true});
}