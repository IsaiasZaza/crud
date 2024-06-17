const { ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../common/utils/enum');
const auth = require('../common/helpers/jwt');
const { secret, timeToken } = require('../config/index');
const { storeToken } = require('../common/helpers/jwt');

async function verifyToken(req, res, next) {
    const tokenHeader = req.headers.authorization;
    const token = tokenHeader && tokenHeader.split(' ')[1];

    if (!token) {
        return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send({
            message: ERROR_MESSAGES.NOT_AUTHORIZED,
        });
    }

    try {
        const decoded = await auth.decode(token, secret);

        console.log('Token recebido:', token);
        await storeToken(token, decoded.userId);
        console.log('Token armazenado no Redis:', token);

        await storeToken(token, decoded.userId, timeToken);

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Erro ao verificar token:', error);
        return res.status(HTTP_STATUS_CODES.FORBIDDEN).send({
            message: ERROR_MESSAGES.FORBIDDEN,
        });
    }
}

module.exports = { verifyToken };
