# koa-swagger-mock
[![build](https://img.shields.io/npm/v/koa-swagger-mock.svg?style=flat-square)](https://www.npmjs.com/package/koa-swagger-mock) 
[![build](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/koa-swagger-mock)
[![download](https://img.shields.io/npm/dt/koa-swagger-mock.svg?style=flat-square)](https://www.npmjs.com/package/koa-swagger-mock)

[![NPM](https://nodei.co/npm/koa-swagger-mock.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/koa-swagger-mock/)
## Introduce
It's a middleware for swagger-mock!

preview this project, do this!
```
git clone https://github.com/ShanaMaid/koa-swagger-mock

npm install

npm run test

url: localhost:3000/pet/1212121212
```

## Usage
`npm install koa-swagger-mock -save`

## Example
```
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
```
this is mock resp!

![mock resp](./example/example.png)

## API
### `KoaSwaggerMock({...params})`

* `swagger` - (*Object*) - (required) - api can be one of the following.
    - A Swagger JSON Object.

* `prefix` - (*String*) - (optional) - url prefix.

```
