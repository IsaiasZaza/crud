const fastify = require('fastify');
const routes = require('./router');

module.exports = config => {
  const { port } = config;
  const app = fastify({
    logger: false,
  });

  routes.forEach(route => app.route(route));

  app.listen({ port, host: '0.0.0.0' }, error => {
    if (error) {
      console.error(error);
      return;
    }
    console.log(`Servidor rodando na porta ${port}`);
  });
};
