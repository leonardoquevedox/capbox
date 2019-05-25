#!/usr/bin/env node
const program = require('commander')
const packageJSON = require('../package.json')

process.env.CAPBOX_STAGE = process.env.CAPBOX_STAGE || 'production'

program.version(packageJSON.version).option('-h, --help', 'Shows this help description.', () => {
  program.help()
})

/* ----- Build ------ */
program
  .command('build <platform>')
  .description('Run application on specified platform: "android", "ios" or "pwa".')
  .option('--release', 'Performs an optimized and signed release build.')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug'
    require('./lib/build')
  })

/* ----- Run ------ */
program
  .command('run <platform>')
  .option('--release', 'Performs an optimized and signed release build.')
  .description('Build application for specified platform: "android", "ios" or "pwa".')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug'
    require('./lib/run')
  })

/* ----- Publish ------ */
program
  .command('publish')
  .description('Run application on specified platform: "android", "ios" or "pwa".')
  .action(() => {
    require('./lib/publish')
  })

/* ----- Resources ------ */
program.command('resources', 'Generated icons & splashscreens for the configured platforms.')

program.parse(process.argv)
