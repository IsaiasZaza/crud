const { createClient } = require('redis');

const redisHost = process.env.REDIS_HOST || 'redis'; // Use 'redis' que é o nome do serviço no docker-compose
const redisPort = process.env.REDIS_PORT || 6379;

const redisClient = createClient({
    url: `redis://${redisHost}:${redisPort}`
});

redisClient.on('error', (err) => {
    console.error('Erro ao conectar ao Redis', err);
});

redisClient.on('connect', () => {
    console.log('Conectado ao Redis');
});

(async () => {
    await redisClient.connect();
})();

module.exports = redisClient;
