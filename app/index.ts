import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
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

const app = express();
app.use(express.json());

const buildUrl = (query: UrlQuery): Url => `${TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}/sendMessage?${query}`;

const buildQuery = (text: Message): UrlQuery => {
  return new URLSearchParams({
    chat_id: TELEGRAM_BOT_CHAT_ID,
    text,
  } as MessageToTelegram).toString();
};

const sendMessage = (text: Message): Promise<boolean> => {
  const urlQuery: UrlQuery = buildQuery(text);
  const url: Url = buildUrl(urlQuery);

  return fetch(url)
    .then((res) => res.json())
    .then((data: ApiResponse): ApiRequestStatus => data.ok);
};

app.all('*', async (req: Request, res: Response) => {
  const text: string | undefined = req.body?.text || req.header('x-text');

  if (text && (await sendMessage(text))) {
    return res.status(200).send('ok');
  }

  return res.status(500).send('not ok');
});

app.listen(APP_PORT, () => console.log(`server is listening on ${APP_PORT}`));
