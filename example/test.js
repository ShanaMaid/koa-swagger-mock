const Koa = require('koa');
const app = new Koa();
const KoaSwaggerMock = require('../lib/koa-swagger-mock');
const path = require('path');


const koaSwagMock = KoaSwaggerMock({
  apiPath: path.resolve(__dirname, '../json/example.json'),
  outputFile: path.resolve(__dirname, '../json/beifen.json'),
  paths: {
    '/pet/findByStatus': {
      name: 'responses',
      operation: 'get',
      response: 200
    },
    '/pet/:petId': {
      name: 'responses',
      operation: 'get',
      response: 200
    }
  }
});

app.use(koaSwagMock.routes());
app.listen(3000);