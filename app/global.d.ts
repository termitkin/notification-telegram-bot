declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_TOKEN?: string;
      TELEGRAM_BOT_CHAT_ID?: string;
    }
  }
}

export {};
