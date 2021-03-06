/* eslint-disable node/no-missing-import */
import type { Request, Response } from 'express';
import express from 'express';
import type {
  ApiRequestStatus,
  ApiResponse,
  AppPort,
  Message,
  MessageToTelegram,
  TelegramAPIUrl,
  Url,
  UrlQuery,
} from './types';

const APP_PORT: AppPort = 3000;
const TELEGRAM_API_URL: TelegramAPIUrl = 'https://api.telegram.org/bot';
const { TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHAT_ID } = process.env;

if (!(TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_CHAT_ID)) {
  console.log('Please set TELEGRAM_BOT_TOKEN and TELEGRAM_BOT_CHAT_ID environment variables');
  process.exit(1);
}

const app = express();
app.use(express.text());

const buildUrl = (query: UrlQuery): Url => `${TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}/sendMessage?${query}`;

const buildQuery = (text: Message): UrlQuery =>
  // eslint-disable-next-line node/no-unsupported-features/node-builtins
  new URLSearchParams({
    chat_id: TELEGRAM_BOT_CHAT_ID,
    text,
  } as MessageToTelegram).toString();

const sendMessage = (text: Message): Promise<boolean | void> => {
  const urlQuery: UrlQuery = buildQuery(text);
  const url: Url = buildUrl(urlQuery);

  return fetch(url)
    .then((res) => res.json())
    .then((data: ApiResponse): ApiRequestStatus => data.ok)
    .catch((err) => console.error(err));
};

app.all('*', async (req: Request, res: Response) => {
  const text: string | undefined = req.header('x-text') || req.body;

  if (text && typeof text === 'string' && (await sendMessage(text))) {
    return res.status(200).send('ok');
  }

  console.log(req.body, req.query, req.params, req.headers, req.method, req.originalUrl, req.url);

  console.log('Failed to send message: ', text);
  return res.status(500).send('not ok');
});

app.listen(APP_PORT, () => console.log(`server is listening on ${APP_PORT}`));
