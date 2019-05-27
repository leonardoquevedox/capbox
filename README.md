# 📦 Capbox  
  
Toolbox for Capacitor.io: Build universal apps with ease and automation!  
![build](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg)  ![platform](https://img.shields.io/node/v/react.svg) ![stars](https://img.shields.io/amo/stars/dustman.svg) ![license](https://img.shields.io/bower/l/bootstrap.svg)  
  
> [![basic-merchandising](https://imgur.com/LNOYczf.png)](https://github.com/leopq)
  
## Introduction  
Capbox mission is to make developers life easier by bringing more automation to the Capacitor apps building worflow. With it, you can drop the native tools and have more time to focus on the core of your application business - or to spend with your family and friends, watch your favourite show... Who knows? ;).   
  
## What's included on the CLI?  
  
### Commands:  
##### `$ capbox run <platform>`  
> Run application on specified `<platform>`: `android`, `ios`, `pwa`, or `desktop`.      
Practial examples? For sure:  
`$ capbox run android`  
`$ capbox run ios`  
`$ capbox run pwa`  
`$ capbox run desktop`  
  
##### `$ capbox build <platform>`  
> Run application on specified `<platform>`: `android`, `ios`, `pwa`, or `desktop`.  
 `--release`: Performs an optimized and signed release build.    
Practial examples? For sure:  
`$ capbox build android`  
`$ capbox build ios`  
`$ capbox build pwa`  
`$ capbox build desktop`  
Or, with the optional release flag:
`$ capbox build ios --release`  
`$ capbox build android --release`  

##### `$ capbox distribute <platform>`  
> Distributes native installers for internal testers on the [Microsoft App Center](https://appcenter.ms/apps) for one the specified `<platform>`: `android` or `ios`.  
Examples:  
`$ capbox distribute android --stage=development`  
`$ capbox distribute ios --stage=production`  
  
##### `$ capbox optimize`  
> Uses tools like Babel and UglifyJS in order to optimize application static files for improved loading times.    
Practial examples? For sure:
`$ capbox optimize`  
Or, with the optional zip flag (Gzips and Brotli files):
`$ capbox optimize --zip`  
  
##### `$ capbox publish <platform>` 
> Publishes application on the Microsoft App Center for the specified `<platform>`: `android` or `ios`. Practial examples? For sure:
`$ capbox publish android`  
`$ capbox publish ios`  
   
  
#### Configuring the distribution:  
* Create an account on [Microsoft App Center](https://appcenter.ms/apps)  
* [Configure your application on the dashboard](https://docs.microsoft.com/en-us/appcenter/dashboard/)  
* Pro tip: Create multiple stages for your application.  
* Add the following settings to the root of your `capacitor.config.json file`:  
```
  "publish": {
    "appcenter": {
      "organization": "App Center Org.",
      "ios": {
        "development": "App Center Org./MyApp-iOS-Development",
        "homolog": "App Center Org./MyApp-iOS-Homolog",
        "production": "App Center Org./MyApp-iOS"
      },
      "android": {
        "development": "App Center Org./MyApp-Android-Development",
        "homolog": "App Center Org./MyApp-Android-Homolog",
        "production": "App Center Org./MyApp-Android"
      }
    }
  }
```  
  
##### Configuring custom stages  
* In case you need custom stages, just add them to the `capacitor.config.json`, like:  
```
  "publish": {
    "appcenter": {
      "organization": "App Center Org.",
      "ios": {
        "QA": "App Center Org./MyApp-iOS-QA"
      },
      "android": {
        "QA": "App Center Org./MyApp-Android-QA"
      }
    }
  }
```  
* Then use them as the stage parameter:  
`$ capbox distribute android --stage=QA`  
  
  
#### And that's all there is about it.  
- Any doubts? Fell free to open an issue.  
- Improvements? Pull requests are always come!  
- Suggestions? Of course: Let's [talk](https://twitter.com/leopq)!  
- Long live Open Source!  