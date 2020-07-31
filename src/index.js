#!/usr/bin/env node
import program from 'commander';
import packageJSON from '../package.json';

/* Scripts */
import build from './lib/build';

import resources from './lib/resources';
import run from './lib/run';
import optimize from './lib/optimize';
import sync from './lib/sync';

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