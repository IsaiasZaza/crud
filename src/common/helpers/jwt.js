const jwt = require('jsonwebtoken');
const { secret, timeToken } = require('../../config/index');
const redisClient = require('./redisClient');

const redisKeyPrefix = 'jwt_token:';

const sign = payload => jwt.sign(payload, secret, { expiresIn: timeToken });

const decode = token => jwt.verify(token, secret);

async function storeToken(token, id) {
    await redisClient.set(redisKeyPrefix + id, token);
}

async function retrieveToken(id) { // Corrigido para usar "id" em vez de "userId"
    return await redisClient.get(redisKeyPrefix + id);
}

module.exports = { sign, decode, storeToken, retrieveToken };
