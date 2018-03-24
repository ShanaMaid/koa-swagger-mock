# koa-swagger-mock
[![build](https://img.shields.io/badge/npm-1.0.2-blue.svg)](https://github.com/ShanaMaid/koa-swagger-mock) 
[![build](https://img.shields.io/npm/l/express.svg)](https://github.com/ShanaMaid/koa-swagger-mock)
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
const KoaSwaggerMock = require('koa-swagger-mock');
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
```
this is mock resp!

![mock resp](./example/example.png)

## API
### `KoaSwaggerMock({apiPath, outputFile, paths})`

* `api` - (*String*) - (required) - api can be one of the following.
    - A relative or absolute path to the Swagger api document.
    - A URL of the Swagger api document.

* `outputFile` - (*String*) - (optional) - Additional options to create the mock generator.
    -  A absolute path to output the backup of swagger.json

#### paths -(*Object*) - (optional)
* `key` - (*Object*) - proxy path
    - `name` - (*String*) - (required)
    - `operation` - (*String*) - (required)
    - `response` - (*Number*) - (required)

eg:
```
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
```
