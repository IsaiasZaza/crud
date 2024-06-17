const { ERROR_MESSAGES, SUCCESS_MESSAGES, HTTP_STATUS_CODES } = require('../common/utils/enum');
const { PrismaClient } = require('@prisma/client');
const { hashPassword } = require('../common/helpers/hashHelper');
const crypto = require('node:crypto');


const prisma = new PrismaClient();

const mapUser = ({ id, name, email, password, updatedAt, createdAt }) => ({
    id,
    name,
    email,
    updatedAt,
});


const createUser = async ({ id, name, email, password, updatedAt, createdAt }) => {
    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return {
                status: HTTP_STATUS_CODES.CONFLICT,
                data: {
                    error: ERROR_MESSAGES.USER_ERROR_EMAIL,
                },
            };
        }
        if (!name || !email || !password) {
            return {
                status: HTTP_STATUS_CODES.BAD_REQUEST,
                data: {
                    error: ERROR_MESSAGES.FIELDS_INVALID,
                },
            };
        }
        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await hashPassword(password, salt);

        const newUser = await prisma.user.create({
            data: {
                id,
                name,
                email,
                password: hashedPassword,
                salt,
            },
        });
        return {
            status: HTTP_STATUS_CODES.CREATED,
            data: mapUser(newUser),
        };

    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: {
                error: ERROR_MESSAGES.ERROR_CREATE_USER,
            },
        };
    }
};

const getUser = async () => {
    try {
        const getUsers = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                password: false,
                createdAt: true,
                updatedAt: false
            },
        })
        return {
            status: HTTP_STATUS_CODES.OK,
            data: getUsers
        }
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            data: {
                error: ERROR_MESSAGES.USERS_NOT_EXIST
            }
        }
    }
}

const deleteUser = async ({ id }) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: ERROR_MESSAGES.USER_NOT_FOUND,
            };
        }
        await prisma.user.delete({ where: { id } })
        return {
            status: HTTP_STATUS_CODES.OK,
            data: ERROR_MESSAGES.USER_DELETED,
        };
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        };
    }
}

const getUserId = async ({ id }) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: { error: ERROR_MESSAGES.USER_NOT_FOUND },
            };
        }
        return {
            status: HTTP_STATUS_CODES.OK,
            data: mapUser(user)
        }

    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.BAD_REQUEST,
            data: { error: ERROR_MESSAGES.USER_NOT_ID },
        }
    }
}

const updateUser = async ({ id, name, email }) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return {
                status: HTTP_STATUS_CODES.NOT_FOUND,
                data: { error: ERROR_MESSAGES.USER_NOT_FOUND },
            };
        }
        const updateUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
            }
        })
        return {
            status: HTTP_STATUS_CODES.OK,
            data: mapUser(updateUser)
        }
    } catch (error) {
        return {
            status: HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
            data: { error: ERROR_MESSAGES.USER_NOT_UPDATE },
        };
    }
}

module.exports = { getUser, createUser, deleteUser, updateUser, getUserId }