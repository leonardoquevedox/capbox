require('colors')

const { log } = console

export default {
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
};
