/**
 * Template for a function module that can be served by serve-function.
 *
 * @module serve-function-module-template
 */
;(function () {
  'use strict'

  /* Imports */

  var ACTION = {
    register: require('./lib/register'),
    log: require('./lib/log')
  }

  /* Exports */
  module.exports = logger

  /**
   * This example function illustrates the format required by the serve-function
   * module. The function should accept an options object containing any
   * function parameters, and a callback to handle the results
   *
   * @function serveFunctionModuleTemplate
   * @alias serve-function-module-template
   *
   * @param {options} options contains all function parameters
   * @param {String} options.action
   * @param {callback} callback handles results
   */
  function logger (options, callback) {
    console.log('logger')
    var action = options.action

    var performAction = ACTION[action]

    if (performAction) {
      performAction(options, callback)
    }
  }
})()
