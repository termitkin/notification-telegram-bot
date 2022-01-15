type APP_PORT_TYPE = number;
type TELEGRAM_API_URL_TYPE = string;
type TELEGRAM_BOT_TOKEN_TYPE = string;
type TELEGRAM_BOT_CHAT_ID_TYPE = string;
type Url = string;
type UrlQuery = string;
type Message = string;
type ApiRequestStatus = boolean;
type MessageToTelegram = {
  chat_id: string;
  text: string;
};

type ApiResponse = {
  ok: boolean;
};

export {
  APP_PORT_TYPE,
  TELEGRAM_API_URL_TYPE,
  TELEGRAM_BOT_TOKEN_TYPE,
  TELEGRAM_BOT_CHAT_ID_TYPE,
  MessageToTelegram,
  ApiResponse,
  Url,
  UrlQuery,
  Message,
  ApiRequestStatus,
};
