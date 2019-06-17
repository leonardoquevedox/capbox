#!/usr/bin/env node
const program = require('commander')
const packageJSON = require('../package.json')

/* Scripts */
const build = require('./lib/build')
const distribute = require('./lib/distribute')
const publish = require('./lib/publish')
const resources = require('./lib/resources')
const run = require('./lib/run')
const optimize = require('./lib/optimize')
const sync = require('./lib/sync')

/* CLI startup */
process.env.CAPBOX_STAGE = process.env.CAPBOX_STAGE || 'production'
program.version(packageJSON.version).option('-h, --help', 'Shows this help description.', () => {
  program.help()
})

/* ----- Run ------ */
program
  .command('run <platform>')
  .option('--release', 'Performs an optimized and signed release build.')
  .description('Build application for specified platform: "android", "ios" or "pwa".')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug'
    sync().then(() => {
      build().then(() => {
        run()
      })
    })
  })

/* ----- Build ------ */
program
  .command('build <platform>')
  .description('Run application on specified platform: "android", "ios" or "pwa".')
  .option('--release', 'Performs an optimized and signed release build.')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_BUILD_TYPE = options.release ? 'release' : 'debug'
    sync().then(() => {
      build()
    })
  })

/* ----- Optimize ------ */
program
  .command('optimize')
  .option('--zip', 'Gzips and brotlis static files.')
  .description('Optimizes application statics for specified platform: "android", "ios" or "pwa".')
  .action((platform, options) => {
    process.env.CAPBOX_ZIP_ASSETS = true
    process.env.CAPBOX_PLATFORM = platform
    optimize()
  })

/* ----- Resources ------ */
program
  .command('resources')
  .description('Generates icons & splashscreens for the configured platforms.')
  .action(() => {
    resources()
  })

program.parse(process.argv)