const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const auth = require('../common/helpers/jwt');
const { ERROR_MESSAGES, HTTP_STATUS_CODES } = require('../common/utils/enum');
const { hashPassword } = require('../common/helpers/hashHelper');


const userLogin = async ({ email, password }) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return {
                status: 404,
                data: ERROR_MESSAGES.USER_NOT_FOUND,
            };
        }

        const hashedPassword = await hashPassword(password, user.salt);
        if (hashedPassword !== user.password) {
            return {
                status: 401,
                data: ERROR_MESSAGES.FILDS_INVALID,
            };
        }
        const { id, name } = user;
        const token = auth.sign({ id, name });
        return {
            status: 200,
            data: { token },
        };
    } catch (error) {
        console.error('Error during login:', error);
        return {
            status: 500,
            data: ERROR_MESSAGES.ERROR_INTERNAL_SERVER,
        };
    }
};

module.exports = { userLogin };
