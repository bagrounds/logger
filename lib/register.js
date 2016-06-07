/**
 * @module register
 */
;(function () {
  var knex = require('knex')

  module.exports = register

  /**
   * Register a new logging session
   *
   * @callback callback
   *
   * @param options
   * @param callback
   */

  var DB_CATALOG = 'pg_catalog.pg_database'
  var DB_NAME = 'datname'

  function register (options, callback) {
    console.log('registering: ' + JSON.stringify(options))

    var id = options.id

    var adapter = knex({
      client: 'pg',
      connection: process.env.PG_CONNECT
    })

    adapter.select()
      .from(DB_CATALOG)
      .where(DB_NAME, id)
      .then(function (values) {
        if (!values.length) {
          console.log('creating database: ' + id)
          adapter.raw('CREATE DATABASE ' + id + ';')
            .then(function () {
              createTables()
            })
        }
      }).then(function () {
      adapter.destroy()
      callback(null, 'done')
    })
  }

  /**
   *
   */
  function createTables () {
    var connection = {
      host: process.env.PG_HOST,
      user: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: 'test_log_db'
    }

    var adapter = knex({
      client: 'pg',
      connection: connection
    })

    adapter.schema.createTable('message', function (t) {
      t.increments('id').primary()
      t.text('content')
    }).then()

    adapter.schema.createTable('message_timestamp', function (t) {
      t.integer('message_id').primary().references('message.id')
      t.text('ms')
    }).then()

    adapter.schema.createTable('message_level', function (t) {
      t.integer('message_id').primary().references('message.id')
      t.text('name')
    }).then()
  }
})()
