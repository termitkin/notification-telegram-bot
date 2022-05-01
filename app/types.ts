export type APP_PORT_TYPE = number;
export type TELEGRAM_API_URL_TYPE = string;
export type TELEGRAM_BOT_TOKEN_TYPE = string;
export type TELEGRAM_BOT_CHAT_ID_TYPE = string;
export type Url = string;
export type UrlQuery = string;
export type Message = string;
export type ApiRequestStatus = boolean;
export type MessageToTelegram = {
  chat_id: string;
  text: string;
};

export type ApiResponse = {
  ok: boolean;
};
