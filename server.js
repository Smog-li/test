const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// NBA API Configuration
const NBA_API_URL = 'https://api.balldontlie.io/v1';
const NBA_API_KEY = 'your-api-key-here'; // Можно получить бесплатно на balldontlie.io

// Вспомогательная функция для форматирования даты
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
}

// Вспомогательная функция для форматирования времени
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// API Endpoint для получения последних игр NBA
app.get('/api/games', async (req, res) => {
    try {
        // Используем демо-данные, если API ключ не установлен
        if (!NBA_API_KEY || NBA_API_KEY === 'your-api-key-here') {
            console.log('Using demo data - set NBA_API_KEY for real data');

            // Демо-данные для тестирования
            const demoGames = [
                {
                    id: 1,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: 'Lakers',
                        city: 'Los Angeles',
                        abbreviation: 'LAL'
                    },
                    awayTeam: {
                        name: 'Warriors',
                        city: 'Golden State',
                        abbreviation: 'GSW'
                    },
                    homeScore: 112,
                    awayScore: 108,
                    status: 'Final',
                    period: 4
                },
                {
                    id: 2,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: 'Celtics',
                        city: 'Boston',
                        abbreviation: 'BOS'
                    },
                    awayTeam: {
                        name: 'Heat',
                        city: 'Miami',
                        abbreviation: 'MIA'
                    },
                    homeScore: 118,
                    awayScore: 115,
                    status: 'Final',
                    period: 4
                },
                {
                    id: 3,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: 'Bucks',
                        city: 'Milwaukee',
                        abbreviation: 'MIL'
                    },
                    awayTeam: {
                        name: 'Nets',
                        city: 'Brooklyn',
                        abbreviation: 'BKN'
                    },
                    homeScore: 125,
                    awayScore: 119,
                    status: 'Final',
                    period: 4
                },
                {
                    id: 4,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: 'Mavericks',
                        city: 'Dallas',
                        abbreviation: 'DAL'
                    },
                    awayTeam: {
                        name: 'Suns',
                        city: 'Phoenix',
                        abbreviation: 'PHX'
                    },
                    homeScore: 103,
                    awayScore: 110,
                    status: 'Final',
                    period: 4
                },
                {
                    id: 5,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: 'Nuggets',
                        city: 'Denver',
                        abbreviation: 'DEN'
                    },
                    awayTeam: {
                        name: 'Clippers',
                        city: 'LA',
                        abbreviation: 'LAC'
                    },
                    homeScore: 121,
                    awayScore: 115,
                    status: 'Final',
                    period: 4
                },
                {
                    id: 6,
                    date: new Date().toISOString(),
                    homeTeam: {
                        name: '76ers',
                        city: 'Philadelphia',
                        abbreviation: 'PHI'
                    },
                    awayTeam: {
                        name: 'Knicks',
                        city: 'New York',
                        abbreviation: 'NYK'
                    },
                    homeScore: 108,
                    awayScore: 105,
                    status: 'Final',
                    period: 4
                }
            ];

            return res.json({
                success: true,
                data: demoGames,
                meta: {
                    total: demoGames.length,
                    demo: true,
                    message: 'Используются демо-данные. Установите NBA_API_KEY для реальных данных.'
                }
            });
        }

        // Реальный запрос к NBA API
        const response = await axios.get(`${NBA_API_URL}/games`, {
            headers: {
                'Authorization': NBA_API_KEY
            },
            params: {
                per_page: 10,
                dates: [new Date().toISOString().split('T')[0]]
            }
        });

        const games = response.data.data.map(game => ({
            id: game.id,
            date: game.date,
            homeTeam: {
                name: game.home_team.name,
                city: game.home_team.city,
                abbreviation: game.home_team.abbreviation
            },
            awayTeam: {
                name: game.visitor_team.name,
                city: game.visitor_team.city,
                abbreviation: game.visitor_team.abbreviation
            },
            homeScore: game.home_team_score,
            awayScore: game.visitor_team_score,
            status: game.status,
            period: game.period
        }));

        res.json({
            success: true,
            data: games,
            meta: {
                total: games.length,
                demo: false
            }
        });

    } catch (error) {
        console.error('Error fetching NBA games:', error.message);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении данных об играх NBA',
            message: error.message
        });
    }
});

// API Endpoint для получения информации о команде
app.get('/api/teams/:abbreviation', async (req, res) => {
    try {
        const { abbreviation } = req.params;

        // Демо-данные для команд
        const demoTeams = {
            'LAL': { name: 'Lakers', city: 'Los Angeles', conference: 'West', division: 'Pacific' },
            'GSW': { name: 'Warriors', city: 'Golden State', conference: 'West', division: 'Pacific' },
            'BOS': { name: 'Celtics', city: 'Boston', conference: 'East', division: 'Atlantic' },
            'MIA': { name: 'Heat', city: 'Miami', conference: 'East', division: 'Southeast' },
        };

        const team = demoTeams[abbreviation.toUpperCase()];

        if (team) {
            res.json({
                success: true,
                data: team
            });
        } else {
            res.status(404).json({
                success: false,
                error: 'Команда не найдена'
            });
        }
    } catch (error) {
        console.error('Error fetching team info:', error.message);
        res.status(500).json({
            success: false,
            error: 'Ошибка при получении информации о команде'
        });
    }
});

// Главная страница
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Обработка несуществующих роутов
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint не найден'
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║        🏀 NBA 2K26 Server Running!                       ║
║                                                           ║
║        Server: http://localhost:${PORT}                   ║
║        API:    http://localhost:${PORT}/api/games         ║
║                                                           ║
║        Press Ctrl+C to stop                              ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
    `);
});

// Обработка ошибок
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
