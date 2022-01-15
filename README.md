# Notification telegram bot

В корне проекта нужно создать файл `.env` с двумя переменныи окружения:

```
TELEGRAM_BOT_TOKEN
TELEGRAM_BOT_CHAT_ID
```

### Сборка бота

```
docker build -t termitkin/notification-telegram-bot:latest .
```

Запуск бота

```
docker-compose up
```
