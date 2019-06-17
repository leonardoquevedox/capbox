# 📦 Capbox  
  
Toolbox for Capacitor.io: Build universal apps with ease and automation!  
![build](https://img.shields.io/appveyor/ci/gruntjs/grunt.svg)  ![platform](https://img.shields.io/node/v/react.svg) ![stars](https://img.shields.io/amo/stars/dustman.svg) ![license](https://img.shields.io/bower/l/bootstrap.svg)  
  
> [![basic-merchandising](https://imgur.com/LNOYczf.png)](https://github.com/leopq)
  
## Introduction  
Capbox mission is to make developers life easier by bringing more automation to the Capacitor apps building worflow. With it, you can drop the native tools and have more time to focus on the core of your application business - or to spend with your family and friends, watch your favourite show... Who knows? ;).   
  
## What's included on the CLI?  
  
### Commands:  
##### `$ capbox run <platform>`  
Run application on specified `<platform>`: `android`, `ios`, `pwa`, or `desktop`.      
Practial examples? For sure:  
`$ capbox run android`  
`$ capbox run ios`  

  
##### `$ capbox build <platform>`  
Run application on specified `<platform>`: `android`, `ios`, `pwa`, or `desktop`.  
 `--release`: Performs an optimized and signed release build.    
Practial examples? For sure:  
`$ capbox build android`  
`$ capbox build ios`  
Or, with the optional release flag:  
`$ capbox build ios --release`  
`$ capbox build android --release`  

##### `$ capbox optimize`  
Uses tools like Babel and UglifyJS in order to optimize application static files for improved loading times.    
Practial examples? For sure:
`$ capbox optimize`  
Or, with the optional zip flag (Gzips and Brotli files):
`$ capbox optimize --zip`  

## Roadmap
- Add PWA platform.
- Add Desktop platform.
  
#### And that's all there is about it.  
- Any doubts? Fell free to open an issue.  
- Improvements? Pull requests are always come!  
- Suggestions? Of course: Let's [talk](https://twitter.com/leopq)!  
- Long live Open Source!  