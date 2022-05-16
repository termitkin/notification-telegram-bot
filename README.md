# Notification telegram bot

The message must be sent as text in the body or in the header field ```x-text```

[Docker image](https://hub.docker.com/r/termitkin/notification-telegram-bot)

### Example of docker-compose.yml

```yml
version: "3"

services:
  notification-telegram-bot:
    image: termitkin/notification-telegram-bot
    container_name: notification-telegram-bot
    restart: unless-stopped
    ports:
      - "5000:3000"
    environment:
      - TELEGRAM_BOT_TOKEN
      - TELEGRAM_BOT_CHAT_ID
    env_file:
      - .env
```

### Example of .env

```dotenv
TELEGRAM_BOT_TOKEN=token
TELEGRAM_BOT_CHAT_ID=chatId
```

### Example of nginx block

```nginx
# Notification telegram bot
location ^~ /notification-telegram-bot/bot-token {
    proxy_pass http://0.0.0.0:5000/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
}
```

### Docker build

```bash
docker build -t termitkin/notification-telegram-bot:latest .
```

### Run docker container

```bash
docker pull termitkin/notification-telegram-bot:latest && docker-compose up -d
```
