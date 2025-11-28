# NBA 2K26 - Футуристичный Веб-Сайт

![NBA 2K26](https://img.shields.io/badge/NBA-2K26-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)

Современный футуристичный веб-сайт о NBA 2K26 с реальными данными о последних играх NBA.

## Возможности

- Футуристичный дизайн с неоновыми эффектами и анимациями
- Информация о NBA 2K26 и баскетболе
- **Реальные данные о последних играх NBA** (Live API)
- Адаптивный дизайн для всех устройств
- Backend на Node.js + Express
- Интеграция с NBA API

## Технологии

### Frontend
- HTML5
- CSS3 (анимации, градиенты, backdrop-filter)
- Vanilla JavaScript (fetch API)

### Backend
- Node.js
- Express.js
- Axios (для запросов к NBA API)
- CORS

## Установка и Запуск

### Предварительные требования
- Node.js (версия 18 или выше)
- npm или yarn

### Шаг 1: Клонирование репозитория

```bash
git clone <your-repo-url>
cd test
```

### Шаг 2: Установка зависимостей

```bash
npm install
```

### Шаг 3: Запуск сервера

```bash
npm start
```

Сервер запустится на `http://localhost:3000`

### Шаг 4: Открыть в браузере

Откройте браузер и перейдите по адресу:
```
http://localhost:3000
```

## Структура проекта

```
test/
├── index.html          # Главная страница
├── styles.css          # Стили
├── server.js           # Backend сервер
├── package.json        # Зависимости Node.js
└── README.md          # Документация
```

## API Endpoints

### GET /api/games
Возвращает список последних игр NBA с результатами.

**Пример ответа:**
```json
{
  "games": [
    {
      "id": 1,
      "date": "2024-01-15",
      "homeTeam": "Lakers",
      "awayTeam": "Warriors",
      "homeScore": 112,
      "awayScore": 108,
      "status": "Final"
    }
  ]
}
```

## Использованные API

- [balldontlie.io](https://www.balldontlie.io/) - Бесплатное NBA API для получения данных о играх

## Особенности дизайна

- Анимированный градиентный фон
- Неоновые эффекты свечения
- Hover-эффекты на карточках
- Плавные переходы и анимации
- Адаптивная верстка для мобильных устройств

## Разработка

### Для разработки с автоперезагрузкой:

```bash
npm install -g nodemon
nodemon server.js
```

### Режим разработки с отладкой:

```bash
npm run dev
```

## Возможные улучшения

- [ ] Добавить фильтрацию игр по командам
- [ ] Добавить статистику игроков
- [ ] Реализовать поиск по играм
- [ ] Добавить графики и визуализацию данных
- [ ] Интеграция с другими спортивными API
- [ ] Добавить авторизацию пользователей
- [ ] Создать админ-панель

## Troubleshooting

### Ошибка "Port 3000 is already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

### Проблемы с CORS
Убедитесь, что CORS middleware установлен в server.js:
```javascript
app.use(cors());
```

## Лицензия

MIT License - используйте свободно для обучения и личных проектов

## Автор

Создано для изучения веб-разработки и работы с API

## Контакты

Если у вас есть вопросы или предложения - создайте Issue в репозитории!

---

**Примечание:** Этот проект создан в образовательных целях. NBA 2K26 и все связанные торговые марки принадлежат их владельцам.
