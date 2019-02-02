const Koa = require('koa');
const app = new Koa();
const KoaSwaggerMock = require('../lib/koa-swagger-mock');
const path = require('path');
const fs = require('fs');


const swagger = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../json/example.json'), {encoding: 'utf8'})
);

const koaSwagMock = KoaSwaggerMock({
  swagger,
  prefix: '/api'
});

app.use(koaSwagMock.routes());
app.listen(3000);