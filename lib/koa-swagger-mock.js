const swagMock = require('swagmock');
const fs = require('fs');
const Router = require('koa-router');

const koaSwaggerMock = ({
  apiPath,
  outputFile,
  paths,
}) => {
  // 备份文件到本地
  if (outputFile) {
    const data = fs.readFileSync(apiPath, {encoding: 'utf8'});
    fs.writeFileSync(outputFile, data);
  }

  // 本地有缓存则从本地读取 否则从远程拉去
  const dataSource = fs.existsSync(outputFile) ? fs.readFileSync(apiPath, {encoding: 'utf8'}) : apiPath;
  const mockgen = swagMock(apiPath);
  const router = new Router();
  // 注册router
  for (const key in paths) {
    if (paths.hasOwnProperty(key)) {
      const element = paths[key];
      router[element.operation](key, (ctx, next) => {
        const params = ctx.params;
        let mockUrl = ctx.url;
        // 构造mockUrl
        for (const param in params) {
          if (params.hasOwnProperty(param)) {
            const element = params[param];
            mockUrl = mockUrl.replace(element, `{${param}}`);
          }
        }
        return new Promise((resovle, reject) => {
          mockgen[element.name]({
          path: mockUrl,
          operation: element.operation,
          response: element.name,
          })
          .then(mock => {
            ctx.body = mock;
            resovle(next());
          })
          .catch(error => {
            reject(error);
          });
        });
      });
    }
  }
  return router;
}

module.exports = koaSwaggerMock;
