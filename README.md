# m2dom — сайт модульных домов (Next.js + Tailwind)
## Запуск
```bash
npm i
echo "TELEGRAM_BOT_TOKEN=123:ABC
TELEGRAM_CHAT_ID=123456
RESEND_API_KEY=re_...
RESEND_FROM=m2dom <noreply@m2dom.house>
RESEND_TO=sales@m2dom.house
SHEETS_CSV_URL=https://docs.google.com/spreadsheets/d/ID/export?format=csv" > .env.local
npm run dev
```
- /api/lead — Telegram + Resend email
- /api/prices — тянет CSV из Google Sheets
