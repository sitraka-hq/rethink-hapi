const Lab = require('lab')
const {expect} = require('code')
const plugin = require('..')
const Hapi = require('hapi')

const {describe, it} = exports.lab = Lab.script()

describe('plugin', () => {
  it('has pkg property', () => {
    expect(plugin).to.be.not.null()
    expect(plugin.pkg).to.include(['name', 'version', 'description'])
  })

  it('has function register', () => {
    expect(plugin.register).to.be.function()
  })

  it('expose getConnection', async () => {
    const server = Hapi.Server()
    await server.register(plugin)
    const connect = await server.plugins['rethink-hapi'].connect
    expect(connect).to.be.a.function()
  })

  it('expose r', async () => {
    const server = Hapi.Server()
    await server.register(plugin)
    const r = await server.plugins['rethink-hapi'].r
    expect(r).to.be.a.function()
  })

  describe('validate', () => {
    it('return default value', () => {
      expect(plugin.validate({})).to.include(['host', 'port'])
    })

    it('throw an error when passing invalid options', () => {
      expect(() => {
        plugin.validate({a: 1})
      }).to.throw()
    })
  })

  describe('init', () => {
    const options = {
      host: 'localhost',
      port: 28015,
      db: 'test'
    }

    it('Return a function', () => {
      const conn = plugin.init(options)
      expect(conn).to.be.a.function()
    })

    it('Return a connection', async () => {
      const connect = plugin.init(options)
      const conn = await connect()
      expect(conn).to.be.an.object()
      conn.close()
    })
  })
})
