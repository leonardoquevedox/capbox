require('colors')

const inquirer = require('inquirer')

const promptForPlatform = () =>
  inquirer.prompt([
    {
      type: 'list',
      name: 'platform',
      message: 'On which platform would you like to run the app?',
      choices: [
        'PWA',
        'Android', 
        'iOS', 
      ],
      default: false
    }
  ])

module.exports = new Promise(async (resolve, reject) => {
  const platform = process.env.CAPBOX_PLATFORM || (await promptForPlatform()).platform
  console.log(platform)
  resolve()
})
