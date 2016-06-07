/**
 * @module log
 */
;(function () {
  var knex = require('knex')

  module.exports = log

  /**
   *
   * @param options
   * @param callback
   */
  function log (options, callback) {
    var id = options.id
    var message = options.message
    var timestamp = options.timestamp
    var level = options.level

    var adapter = knex({
      client: 'pg',
      connection: {
        user: process.env.PG_USER,
        password: process.env.PG_PASS,
        database: id,
        host: '10.4.36.44'
      }
    })

    adapter.insert({content: message})
      .into('message').returning('id')
      .then(function (x) {
        x = Number(x)
        console.log(x)
        adapter.insert({message_id: x, ms: timestamp})
          .into('message_timestamp')
          .then()

        adapter.insert({message_id: x, name: level})
          .into('message_level')
          .then()
      }).then(function () {
      adapter.destroy()
    }).asCallback(callback)
  }
})()
