# Bitcoin Price Tracker

Это проект для отслеживания цен на Bitcoin, который включает:

- **Data Service** для работы с данными из базы данных PostgreSQL.
- **Nuxt.js приложение** для отображения графиков цен.
- **PostgreSQL база данных**, которая хранит данные о ценах на Bitcoin.

## Структура проекта

- `data-service/` - сервис, который обрабатывает данные из базы данных и предоставляет API.
- `db/` - директория с инициализацией базы данных.
- `nuxt-app/` - фронтенд на Nuxt.js, который визуализирует данные.

## Требования

Для локального развертывания проекта необходимо:

- Docker
- Docker Compose

## Установка

1. Клонируйте репозиторий:

    ```bash
    git clone https://github.com/Tokimikichika/BitcoinPriceTracker.git
    cd bitcoin-price-tracker
    ```

2. Убедитесь, что у вас есть Docker и Docker Compose:

    - [Установка Docker](https://docs.docker.com/get-docker/)
    - [Установка Docker Compose](https://docs.docker.com/compose/install/)

## Локальный запуск

1. Запустите контейнеры с помощью Docker Compose:

```
docker-compose up --build
```

    Этот процесс соберет все необходимые Docker образы для:
    - **PostgreSQL** - база данных, которая будет работать на порту 5433.
    - **Data Service** - сервис для обработки запросов к базе данных.
    - **Nuxt App** - фронтенд приложение, которое будет доступно на порту 3000.

2. Дождитесь, пока контейнеры загрузятся и запустятся. Вы увидите вывод, подобный следующему:

```
Starting bitcoin-price-tracker_db_1 ... done
Starting bitcoin-price-tracker_data-service_1 ... done
Starting bitcoin-price-tracker_nuxt-app_1 ... done
```

3. Перейдите в браузер и откройте **http://localhost:3000** для доступа к приложению.

## Доступ к базе данных

База данных PostgreSQL будет доступна на порту 5433 на вашем локальном хосте.

Для подключения используйте следующие параметры:

- **Host**: `localhost`
- **Port**: `5433`
- **Username**: `postgres`
- **Password**: `password`
- **Database**: `bitcoin`

## Инициализация базы данных

При запуске контейнеров скрипт инициализации базы данных (`db/init.sql`) будет выполнен автоматически. Если вы хотите изменить или обновить данные, отредактируйте файл `db/init.sql` и пересоберите контейнеры:

```
docker-compose down
docker-compose up --build
```
