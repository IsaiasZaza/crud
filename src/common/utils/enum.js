const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'Usuario não encontrado',
    USER_NOT_UPDATE: 'Ocorreu um erro ao atualizar usuário.',
    USER_NOT_ID: 'Ocorreu um erro ao obter usuário por ID.',
    USERS_NOT_EXIST: 'Ocorreu um erro ao solicitar a lista de usuários',
    ERROR_CREAT_USER: 'Ocorreu um erro ao criar o usuário.',
    USER_ERROR_EMAIL: 'Já existe um usuario com este email.',
    FILDS_INVALID: 'Todos os campos obrigatórios devem ser fornecidos.',
    ERROR_USER_OR_PASSWORD: 'Credenciais inválidas',
    USER_DELETED: 'Usuário excluído com sucesso',
    ERROR_INTERNAL_SERVER: 'Ocorreu um erro interno no servidor',
    NOT_AUTHORIZED: 'Não autorizado',
    FORBIDDEN: 'Forbidden',
  };
  
  const SUCCESS_MESSAGES = {
    SUCCESS_PASSWORD_CHANGED: 'Senha alterada com sucesso',
  };
  
  const USER_ROLES_DESCRIPTION = {
    ADMIN: 'admin',
    READ: 'read',
    WRITE: 'write',
  };
  
  const HTTP_STATUS_CODES = {
    OK: 200,
    CONFLICT: 409,
    BAD_REQUEST: 400,
    CREATED: 201,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  };
  
  module.exports = {
    ERROR_MESSAGES, HTTP_STATUS_CODES, SUCCESS_MESSAGES, USER_ROLES_DESCRIPTION,
  };
  