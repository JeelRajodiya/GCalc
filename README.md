# GCalc
clone of google's android calculator but in React.


A calculator made with javascript , ionic and React.
it is currently under development.

>download [***APK file***](https://github.com/jeel2331/GCalc/raw/main/src/build/app-debug.apk)
of latest build


![demo](https://github.com/jeel2331/GCalc/raw/main/src/icons/demo.png)

# Getting Started 

```
git clone https://github.com/jeel2331/GCalc.git
cd GCalc
npm install
```

**now you have all dependencies.**



# To start a development server.

`ionic serve` will start a development sever.

(make sure you have ionic installed `npm i ionic -g`)


# to build apk from source

```
ionic cap sync
ionic cap add android
``` 
(it will create a android folder, now navigate to the android folder `cd android`)

(if you don't have anroid sdk download it)

to generate apk use `gradle assembleDebug`
it will create a apk under ***GCalc/android\app\build\outputs\apk\debug*** folder

***it is now ready to use***
