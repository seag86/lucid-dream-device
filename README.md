# lucid-dream-device
This is device and mobile application, created to help experience lucid dreams.

## How it works
Device measures heartrate with sensor MAX 30102. When you sleep your heartrate is usual low, but when you see the dreams it getting up, pulse data collecting by Arduino nano, which send it to the mobile app using bluetooth low power module HM-10. Mobile app based on react-native platform. When the heartrate is getting over than treshold, it flashes camera torch to your face, so it messages to you in dream, that you in dream.

## Mobile application
You can launch app and turn display off, app will keep working in sleep mode

 Home | Device  | Settings
:-------------------------:|:-------------------------:|:-------------------------:
 ![](https://github.com/seag86/lucid-dream-device/blob/main/images/Screenshot_1.jpg) | ![](https://github.com/seag86/lucid-dream-device/blob/main/images/Screenshot_2.jpg) | ![](https://github.com/seag86/lucid-dream-device/blob/main/images/Screenshot_3.jpg)  


## Heart rate diogram from log file
To build diogram from log file just put it to RateDiogram folder, rename to log.js and open index.html file. X axis is the time in seconds after app started, Y axis is heartrate. RateDiogram can help determine your average dream heartrate treshold.

![RateDiogram script](https://github.com/seag86/lucid-dream-device/blob/main/RateDiogram/example_diogram.jpg)
