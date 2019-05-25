require('colors')

const { log } = console
module.exports = {
  info: str => {
    log(str)
  },
  success: str => {
    log(`✓ ${str}`.green)
  },
  error: str => {
    log(`× ${str}`.red)
  },
  header: str => {
    log('')
    log(str.yellow)
  }
}
