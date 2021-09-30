/*
  Optical Heart Rate Detection (PBA Algorithm) using the MAX30105 Breakout
  By: Nathan Seidle @ SparkFun Electronics
  Date: October 2nd, 2016
  https://github.com/sparkfun/MAX30105_Breakout
  This is a demo to show the reading of heart rate or beats per minute (BPM) using
  a Penpheral Beat Amplitude (PBA) algorithm.
  It is best to attach the sensor to your finger using a rubber band or other tightening
  device. Humans are generally bad at applying constant pressure to a thing. When you
  press your finger against the sensor it varies enough to cause the blood in your
  finger to flow differently which causes the sensor readings to go wonky.
  Hardware Connections (Breakoutboard to Arduino):
  -5V = 5V (3.3V is allowed)
  -GND = GND
  -SDA = A4 (or SDA)
  -SCL = A5 (or SCL)
  -INT = Not connected
  The MAX30105 Breakout can handle 5V or 3.3V I2C logic. We recommend powering the board with 5V
  but it will also run at 3.3V.
*/

#include <Wire.h>
#include "MAX30105.h"

#include "heartRate.h"

#include <SoftwareSerial.h>
SoftwareSerial HM10(5, 4); // RX, TX
char appData;  
String inData = "";

MAX30105 particleSensor;

const byte RATE_SIZE = 20; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE] = {70, 70, 70, 70, 70, 70, 70, 70, 70, 70,
70, 70, 70, 70, 70, 70, 70, 70, 70, 70}; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred

float beatsPerMinute;
int beatAvg;

float previousBeatsPerMinute = 70; // start bit rate
float beatMax;
float beatMin;
float beatMaxLimit = 150;
float beatMinLimit = 30;
float deltaBitInit = 10;
float deltaBit = deltaBitInit;

String  msg = "";
long interval = 5000; //send interval
long lastTime;
int ledInd = LOW;

long startTime;

void setup()
{
  HM10.begin(57600);
  delay(100);
  HM10.print("Initializing HM10");


  Serial.begin(115200);
  Serial.println("Initializing...");

  // Initialize sensor
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println("MAX30105 was not found. Please check wiring/power. ");
    //while (1);
  }
  Serial.println("Place your index finger on the sensor with steady pressure.");

  //particleSensor.setup(); //Configure sensor with default settings
  //particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
  //particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

  //Setup to sense up to 18 inches, max LED brightness
  byte ledBrightness = 32; //Options: 0=Off to 255=50mA ~32
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  int sampleRate = 400; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; //Options: 69, 118, 215, 411
  int adcRange = 2048; //Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings
  //  particleSensor.setup(); //Configure sensor. Use 6.4mA for LED drive

  startTime = millis();

  // led
  pinMode(13, OUTPUT); // объявляем пин 13 как выход
  digitalWrite(13, LOW); // выключаем светодиод
}





void loop()
{
  
// Data input
//   HM10.listen();  // слушаем HM10 port
//    while (HM10.available() > 0) {   // если HM10 что то передает, то считываем данные
//    appData = HM10.read();
//    inData = String(appData);  // сохраняем данные в строковой переменной
//    //Serial.write(appData);
//    //Serial.write(appData);
//    //HM10.write(appData);
//  }
//    if (Serial.available()) {           // считываем информацию если пользователь что-нибудь вводит
//    delay(10);
//    HM10.write(Serial.read());
//  }
//  if ( inData == "F") {
//    //Serial.println("LED OFF");
//    digitalWrite(13, LOW); // выключаем светодиод
//  }
//  if ( inData == "N" ) {
//    //Serial.println("LED ON");
//    digitalWrite(13, HIGH); // включаем светодиод
//  }

  
  //-------------------------------------

  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue) == true)
  {
    //We sensed a beat!
    long delta = millis() - lastBeat;
    lastBeat = millis();

    beatsPerMinute = 60 / (delta / 1000.0);

    beatMax = previousBeatsPerMinute + deltaBit;
    beatMin = previousBeatsPerMinute - deltaBit;
    if(beatMax > beatMaxLimit) beatMax = beatMaxLimit;
    if(beatMin < beatMinLimit) beatMin = beatMinLimit;
    deltaBit++;

    if (beatsPerMinute < beatMax  && beatsPerMinute > beatMin)
    //if (beatsPerMinute < 150  && beatsPerMinute > 50)
    {
      previousBeatsPerMinute = beatsPerMinute;
      deltaBit = deltaBitInit;
      
      rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
      rateSpot %= RATE_SIZE; //Wrap variable

      //Take average of readings
      beatAvg = 0;
      for (byte x = 0 ; x < RATE_SIZE ; x++)
        beatAvg += rates[x];
      beatAvg /= RATE_SIZE;
    }
    
    Serial.print("BPM=");
    Serial.print(beatsPerMinute);
    Serial.print(", Avg BPM=");
    Serial.println(beatAvg);

    if (beatAvg < beatMaxLimit && beatAvg > beatMinLimit)
    msg = 
          // "bpm: " + String(previousBeatsPerMinute)+
          // ", raw: " + String(beatsPerMinute)+
          "avg%" + String(beatAvg);

    if (irValue < 50000) msg += "%err_contact";

//     if (millis() > lastTime+interval){
//      // Send datas
//      HM10.println(msg);
//      lastTime = millis();
//     }

    // Send datas
    HM10.println(msg);

    
    //led 
    if(ledInd==HIGH)ledInd = LOW;
    else ledInd = HIGH;
    digitalWrite(13, ledInd); 
    
//    digitalWrite(13, HIGH); 
//    delay(5);
//    digitalWrite(13, LOW);

//    Serial.println(", Avg BPM=");
//    Serial.print(beatAvg);
    
  }

//  Serial.print("IR=");
//  Serial.print(irValue);
//  Serial.print(", BPM=");
//  Serial.print(beatsPerMinute);
//  Serial.print(", Avg BPM=");
//  Serial.print(beatAvg);

  
}
