/**
 * Tests for serve-function-module-template
 */
;(function () {
  /* global describe, it */
  'use strict'

  /* Imports */
  var expect = require('chai').expect

  var logger = require('../logger')

  /* Tests */
  describe('logger', function () {
    var loggerOptions = {
      action: 'register',
      id: 'test'
    }

    var id

    it('should register a new instance', function (done) {
      logger(loggerOptions, function (error, result) {
        expect(error).not.to.be.ok

        expect(result).to.be.ok

        id = result
        done()
      })
    })

    it('should log', function (done) {
      var loggerOptions = {
        action: 'log',
        level: 'info',
        timestamp: Date.now(),
        message: 'this is a test log!'
      }

      logger(loggerOptions, function (error, result) {})
    })
  })

  function itShouldError (forString, options) {
    it('should return an error for ' + forString, function (done) {
      serveFunctionModule(options, function (error) {
        expect(error).to.be.an('error')

        done()
      })
    })
  }
})()
