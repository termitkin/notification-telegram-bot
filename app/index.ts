import type { Request, Response } from 'express';
import express from 'express';
import type {
  ApiRequestStatus,
  ApiResponse,
  APP_PORT_TYPE,
  Message,
  MessageToTelegram,
  TELEGRAM_API_URL_TYPE,
  TELEGRAM_BOT_CHAT_ID_TYPE,
  TELEGRAM_BOT_TOKEN_TYPE,
  Url,
  UrlQuery,
} from './types';

const APP_PORT: APP_PORT_TYPE = 3000;
const TELEGRAM_API_URL: TELEGRAM_API_URL_TYPE = 'https://api.telegram.org/bot';
const TELEGRAM_BOT_TOKEN: TELEGRAM_BOT_TOKEN_TYPE = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_BOT_CHAT_ID: TELEGRAM_BOT_CHAT_ID_TYPE = process.env.TELEGRAM_BOT_CHAT_ID;

if (!(TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_CHAT_ID)) {
  console.log('Please set TELEGRAM_BOT_TOKEN and TELEGRAM_BOT_CHAT_ID environment variables');
  process.exit(1);
}

const app = express();
app.use(express.text());

const buildUrl = (query: UrlQuery): Url => `${TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}/sendMessage?${query}`;

const buildQuery = (text: Message): UrlQuery => {
  return new URLSearchParams({
    chat_id: TELEGRAM_BOT_CHAT_ID,
    text,
  } as MessageToTelegram).toString();
};

const sendMessage = (text: Message): Promise<boolean | void> => {
  const urlQuery: UrlQuery = buildQuery(text);
  const url: Url = buildUrl(urlQuery);

  return fetch(url)
    .then((res) => res.json())
    .then((data: ApiResponse): ApiRequestStatus => data.ok)
    .catch((err) => console.error(err));
};

app.all('*', async (req: Request, res: Response) => {
  const text: string | undefined = req.body || req.header('x-text');

  if (text && (await sendMessage(text))) {
    return res.status(200).send('ok');
  }

  console.log('Failed to send message: ', text);
  return res.status(500).send('not ok');
});

app.listen(APP_PORT, () => console.log(`server is listening on ${APP_PORT}`));
