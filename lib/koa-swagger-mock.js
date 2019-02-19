const swagMock = require('swagmock');
const Router = require('koa-router');

const koaSwaggerMock = ({
  swagger,
  prefix = '',
}) => {
  const mockgen = swagMock(swagger);
  const paths = Object.keys(swagger.paths);
  const routers = new Router();
  for (const path of paths) {
    const methods = Object.keys(swagger.paths[path]);
    for (const method of methods) {
      const origin = `${prefix}${path}`;
      const url = origin.replace(/\{(.*?)\}/g, ':$1');
      routers[method](url, (ctx, next) => {
        return new Promise((resovle, reject) => {
          mockgen.responses({
          path,
          operation: method.toLowerCase(),
          response: 200,
          })
          .then(mock => {
            ctx.body = mock.responses;
            resovle(next());
          })
          .catch(error => {
            reject(error);
          });
        });
      })
    }
  }
  return routers;
}

module.exports = koaSwaggerMock;
