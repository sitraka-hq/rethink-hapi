const Hapi = require('hapi')

const server = Hapi.Server()

// Register the plugin
server.register(require('./index'))

// Obtain a connection
async function testRethinkConnection () {
  const {connect, r} = server.plugins['rethink-hapi']
  const conn = await connect()
  const db = await r.dbList().run(conn)
  console.log(db)
  await conn.close()
}

testRethinkConnection()
