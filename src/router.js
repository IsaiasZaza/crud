
const userController = require('./controllers/userController');
const { userLogin } = require('./controllers/authController');
const { verifyToken } = require('./middlewares/verifyToken');

const routes = [
  {
    method: 'GET',
    url: '/users',
    schema: {
      summary: 'This method retrieves all users',
    },
    handler: async (req, res) => {
      const { status, data } = await userController.getUser();
      return res.status(status).send(data);
    },
  },
  {
    method: 'GET',
    url: '/user/:id',
    schema: {
      summary: 'This method retrieves a user by ID',
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { status, data } = await userController.getUserId(id);
      return res.status(status).send(data);
    },
  },
  {
    method: 'POST',
    url: '/users',
    schema: {
      summary: 'This method create a user',
    },
    handler: async (req, res) => {
      const payload = {
        ...req.body,
      };
      const { status, data } = await userController.createUser(payload);
      return res.status(status).send(data);
    },
  },
  {
    method: 'DELETE',
    url: '/user/:id',
    preHandler: verifyToken,
    schema: {
      summary: 'This method delete',
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { status, data } = await userController.deleteUser({ id })
      return res.status(status).send(data);
    }
  },
  {
    method: 'GET',
    url: '/users/:id',
    schema: {
      summary: 'This method get a user by ID',
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { status, data } = await userController.getUserId({ id });
      return res.status(status).send(data);
    },
  },
  {
    method: 'PUT',
    url: '/user/:id',
    schema: {
      summary: 'This method updates a user by ID',
    },
    handler: async (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;
      const { status, data } = await userController.updateUser({
        id, name, email,
      });
      return res.status(status).send(data);
    },
  },
  {
    method: 'POST',
    url: '/login',
    schema: {
      summary: 'This method logs in a user',
    },
    handler: async (req, res) => {
      const { email, password } = req.body;
      const { status, data } = await userLogin({ email, password });
      return res.status(status).send(data);
    },
  },
];


module.exports = routes;
