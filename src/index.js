const serverConfig = require('./server');
const config = require('./config');

const init = async () => {
  try {
    await serverConfig(config);
    // eslint-disable-next-line no-console
    console.log('Servidor iniciado com sucesso');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Ouve erro na inicialização do servidor: ${error}`);
  }
};

init();