const chalk = require('chalk');
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./src/data/data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.listen(2222, () => {
  console.log(
    chalk.bold('API running at ') + chalk.cyan.bold('http://localhost:2222'));
});
