require('colors')

const shell = require('shelljs')
const path = require('path')
const dotenv = require('dotenv')

dotenv.config()

const isAppleBuild = process.env.REACT_APP_PLATFORM === 'ios'
const rootPath = path.resolve(__dirname, '../../../')
const { exec } = shell

/* Android settings */
const androidPath = path.join(rootPath, 'android')
const apkPath = path.join(
  androidPath,
  'app',
  'build',
  'outputs',
  'apk',
  'release',
  'app-release.apk'
)

/* iOS settings */
const iosPath = path.join(rootPath, 'ios')
const ipaPath = path.join(iosPath, 'app.ipa')

const appName = isAppleBuild
  ? process.env.MICROSOFT_APPCENTER_IOS_APP_NAME
  : process.env.MICROSOFT_APPCENTER_ANDROID_APP_NAME
const appExecutable = isAppleBuild ? ipaPath : apkPath

dotenv.config()

const build = async () => {
  console.log(`Uploading app build to Azure...`.yellow)
  await exec(
    `npx appcenter distribute release --app ${appName} -f ${appExecutable} -g Collaborators`,
    { cwd: androidPath }
  )
  console.log(`Android build installed successfully!`.green.bold)
  process.exit()
}

build()
