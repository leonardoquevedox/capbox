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
      run()
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

/* ----- Publish ------ */
program
  .command('distribute <platform>')
  .option('--stage', 'Performs an optimized and signed release build.')
  .description('Run application on specified platform: "android", "ios" or "pwa".')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_DISTRIBUTE_STAGE = options.stage
    process.env.CAPBOX_BUILD_TYPE = 'release'
    sync().then(() => {
      build().then(() => {
        distribute()
      })
    })
  })

/* ----- Publish ------ */
program
  .command('publish <platform>')
  .description('Run application on specified platform: "android", "ios" or "pwa".')
  .action((platform, options) => {
    process.env.CAPBOX_PLATFORM = platform
    process.env.CAPBOX_PUBLISH_STAGE = options.stage
    process.env.CAPBOX_BUILD_TYPE = 'release'
    sync().then(() => {
      build().then(() => {
        publish()
      })
    })
  })

/* ----- Resources ------ */
program
  .command('resources')
  .description('Generates icons & splashscreens for the configured platforms.')
  .action(() => {
    resources()
  })

/* ----- Optimize ------ */
program
  .command('optimize <platform>')
  .description('Optimizes application statics for specified platform: "android", "ios" or "pwa".')
  .action(platform => {
    process.env.CAPBOX_PLATFORM = platform
    sync().then(() => {
      optimize()
    })
  })

program.parse(process.argv)
