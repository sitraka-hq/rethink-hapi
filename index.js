const Joi = require('joi')
const r = require('rethinkdb')

const optionsSchema = Joi.object().keys({
  host: Joi.string().hostname().default('localhost'),
  port: Joi.number().port().default(28015),
  db: Joi.string().default('test'),
  user: Joi.string().default('admin'),
  password: Joi.string().default(''),
  ssl: Joi.object().keys({
    ca: Joi.binary().required()
  }).allow(null).default(null)
})

function init (options) {
  const _options = options
  return async () => {
    const connection = await r.connect(_options)
    return connection
  }
}

function validate (options) {
  const {error, value} = Joi.validate(options, optionsSchema)
  if (error !== null) {
    throw error
  }
  return value
}

module.exports = {
  pkg: require('./package.json'),
  register: async (server, options) => {
    const _options = validate(options)
    const getConnection = init(_options)
    server.expose('connect', getConnection)
    server.expose('r', r)
  }
}

module.exports.init = init
module.exports.validate = validate
