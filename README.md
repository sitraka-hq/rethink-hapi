#RETHINK-HAPI

An [HapiJS](https://hapijs.com/) plugin for [rethinkdb](https://rethinkdb.com).

> This plugin is only compatible with hapijs __v17.x.x__ and uses the rethinkdb
official driver.

### Installation
```js
yarn add rethink-hapi
```
If you prefer npm:
```js
npm -i rethink-hapi
```

## Usage
Register the plugin to the server

### Obtain a rethinkdb connection
> __WARNING__: Never forget to close the connection via await conn.close().

```js
const Hapi = require('hapi')

const server = Hapi.Server()

// Register the plugin
server.register(require('rethink-hapi'))

// Obtain a connection
async function testRethinkConnection () {
  const {connect, r} = server.plugins['rethink-hapi']
  const conn = await connect()
  const db = await r.dbList().run(conn)
  console.log(db)
  await conn.close()
}

testRethinkConnection()

```

// TODO: Create demo

## Plugin options
- `host`: rethinkdb hostname. Default `localhost`
- `port`: rethinkdb port. Default `28015`
- `db`: database name. Default `test`
- `username`: database username. Default `admin`
- `password`: database user password. Default `''`
- `ssl`: a hash of options to support SSL connections. Default `null`

## Function and object exposed by rethink-hapi

- `connect`: A function used to get a connection.
- `r`: The top-level ReQL namespace.
